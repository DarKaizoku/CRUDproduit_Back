import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { ProduitsService } from './produits.service';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { ApiTags } from '@nestjs/swagger';
import { Produit } from './entities/produit.entity';
import { EMessageStatus, EStatus } from 'src/constants/enum';

@ApiTags('produits')
@Controller('produits')
export class ProduitsController {
  constructor(private readonly produitsService: ProduitsService) {}

  @Post()
  async create(@Body() createProduitDto: CreateProduitDto) {
    const dataCheck = await Produit.findOneBy({ nom: createProduitDto.nom });
    if (dataCheck) {
      return {
        status: EStatus.FAIL,
        message: EMessageStatus.x2,
        data: createProduitDto.nom,
      };
    }
    const newData = await this.produitsService.create(createProduitDto);
    return {
      status: EStatus.OK,
      message: EMessageStatus.createdOK,
      data: newData,
    };
  }

  @Get()
  async findAll() {
    const data = await this.produitsService.findAll();
    if (!data) {
      return {
        status: EStatus.FAIL,
        message: EMessageStatus.Unknown,
      };
    }
    return {
      status: EStatus.OK,
      message: EMessageStatus.dataOK,
      data: data,
    };
  }

  @Get(':id')
  async findOneId(@Param('id', ParseIntPipe) id: number) {
    const data = await this.produitsService.findOne(id);

    if (!data) {
      return {
        status: EStatus.FAIL,
        message: EMessageStatus.Unknown,
      };
    }
    return {
      status: EStatus.OK,
      message: EMessageStatus.dataOK,
      data: data,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProduitDto: UpdateProduitDto,
  ) {
    const dataCheck = await Produit.findOneBy({ id });
    if (!dataCheck) {
      return {
        status: EStatus.FAIL,
        message: EMessageStatus.Unknown,
      };
    }

    const nomCheck = await Produit.findOneBy({ nom: updateProduitDto.nom });
    if (nomCheck) {
      if (nomCheck!.id !== id) {
        return {
          status: EStatus.FAIL,
          message: EMessageStatus.x2,
          data: updateProduitDto.nom,
        };
      }
    }

    const dataUpdated = await this.produitsService.update(id, updateProduitDto);
    return {
      status: EStatus.OK,
      message: EMessageStatus.updateOK,
      data: dataUpdated,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const dataCheck = await Produit.findOneBy({ id });
    if (!dataCheck) {
      return {
        status: EStatus.FAIL,
        message: EMessageStatus.Unknown,
      };
    }
    const saveData = await this.produitsService.remove(id);
    if (saveData) {
      return {
        status: EStatus.OK,
        message: EMessageStatus.DeletedOK,
        save: saveData,
      };
    }
  }
}
