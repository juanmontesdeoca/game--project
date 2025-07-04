import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Game } from './entities/game.entity';

@Injectable()
export class GamesService {
  private readonly logger = new Logger('GamesService');

  constructor( 
    @InjectModel(Game)
    private gameModel: typeof Game,
  ){}

  async findAll() {
    try {
      return await this.gameModel.findAll();
    } catch (error) {
      this.handleDBEexecption(error);
    }
  }

// ...existing code...
 async create(createGameDto: CreateGameDto) {
    const { name, maxPlayers, playerName, state } = createGameDto;
   
    try {
      const newGame = await this.gameModel.create({
       name,
       maxPlayers,
      players: [playerName] ,
      state: state || 'waiting',
      score: {}
    }  );
  
    return newGame;

  } catch (error) {
    this.handleDBEexecption(error);
   }

  }

  async findOne(id: number) {
    const game = await this.gameModel.findOne({
      where: { 
        id: id,
      },
      
    });
    if (!game) {
       throw new BadRequestException(`Game with id ${id} not found`);

    }    
  return game;
  }


  async joinGame(id: number, updateGameDto: UpdateGameDto) {
    const { playerName } = updateGameDto;
    const game = await this.findOne(id);
    if (!playerName) {
      throw new BadRequestException('playerName is required');
    }
    if (game.players.includes(playerName)) {
      throw new BadRequestException(`Player ${playerName} is already in the game`);
    }
    const newPlayers = [...game.players, playerName];
    try {
      await game.update({ players: newPlayers });
      return {
        message: `Player ${playerName} joined the game successfully`,
      };
    } catch (error) {
      this.handleDBEexecption(error);
    }
  }

  async startGame(id: number) {
    const game = await this.findOne(id);
    if (game.state === 'in_project') {
      throw new BadRequestException('Game is already in progress');
    }
    await game.update({ state: 'in_project' });
    return { message: `Game ${id} started successfully` };
  }

  async endGame(id: number, updateGameDto: UpdateGameDto) {
    const game = await this.findOne(id);
    try {
      await game.update({
        score: updateGameDto.score,
        state: 'finished',
      });
      return {
        message: `Game finished successfully`,
      };
    } catch (error) {
      this.handleDBEexecption(error);
    }
  }

  private handleDBEexecption(error: any) {
    if (error.parent && error.parent.code === '23505') {
      throw new BadRequestException(error.parent.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException('Something went very weong!');
  }
}
