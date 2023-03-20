import { Injectable } from '@nestjs/common';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { Produit } from './entities/produit.entity';

@Injectable()
export class ProduitsService {
  async create(createProduitDto: CreateProduitDto): Promise<Produit> {
    const newData = new Produit();
    newData.nom = createProduitDto.nom;
    newData.prix = createProduitDto.prix;
    newData.quantite = createProduitDto.quantite;

    await Produit.save(newData);

    const dataCreated = await Produit.findOneBy({ nom: newData.nom });
    return dataCreated;
  }

  async findAll(): Promise<Produit[] | undefined> {
    const data = await Produit.find();
    if (!data[0]) {
      return undefined;
    }
    return data;
  }

  async findOne(id: number): Promise<Produit | undefined> {
    const data = await Produit.findOneBy({ id });
    if (data) {
      return data;
    }
    return undefined;
  }

  async update(
    id: number,
    updateProduitDto: UpdateProduitDto,
  ): Promise<Produit> {
    await Produit.update(id, updateProduitDto);
    const data = await Produit.findOneBy({ id });
    return data;
  }

  async remove(id: number) {
    const data = await Produit.findOneBy({ id });

    const dataDeleted = await Produit.remove(data);
    return data;
  }
}
