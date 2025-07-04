import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { IsArray, IsEnum, IsObject, Min } from "class-validator";
export enum GameState {
  WAITING = 'waiting',
    IN_PROGRESS = 'in_project',
    FINISHED = 'finished',

    }
export class CreateGameDto {

    @IsString()
    @IsNotEmpty()

name: string;
@IsInt(    )
@Min(2)
maxPlayers: number;


@IsString()
@IsOptional()
playerName?: string;

@IsEnum(GameState)
@IsOptional()

state: GameState;


@IsObject()
@IsOptional()

score: Record<string, number>;




}

