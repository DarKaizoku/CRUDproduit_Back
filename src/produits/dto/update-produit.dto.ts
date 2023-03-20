import { PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateProduitDto } from './create-produit.dto';

export class UpdateProduitDto extends PartialType(CreateProduitDto) {
  @IsOptional()
  nom: string;

  @IsOptional()
  prix: number;

  @IsOptional()
  quantite: number;
}
