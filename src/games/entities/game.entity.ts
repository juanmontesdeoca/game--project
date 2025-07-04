import { Column, DataType, Table,Model, AllowNull} from 'sequelize-typescript';


@Table
export class Game extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  maxPlayers: number;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
    defaultValue: [],
  })
  players: string[];

  @Column({
    type: DataType.ENUM('waiting', 'in_project', 'finished'),
    allowNull: false,
    defaultValue: 'waiting',
  })
  state: string;

  @Column({
    type: DataType.JSONB,
    allowNull: false,
    defaultValue: {},
  })
  score: Record<string, number>;
}

     