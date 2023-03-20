import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProduitDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nom: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  prix: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantite: number;
}
