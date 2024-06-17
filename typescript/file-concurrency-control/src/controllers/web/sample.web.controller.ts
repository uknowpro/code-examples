import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import {
  CreateSampleCommand,
  UpdateSampleCommand,
  DeleteSampleCommand,
} from '@core/commands';
import { CreateSampleDto, SampleDto, UpdateSampleDto } from '@core/dtos';
import { GetSampleQuery, ListSamplesQuery } from '@core/queries';

@Controller(['v1/samples'])
export class SampleWebController {
  constructor(
    @Inject('GetSampleQuery')
    private readonly getSampleQuery: GetSampleQuery,
    @Inject('ListSamplesQuery')
    private readonly listSampleQuery: ListSamplesQuery,

    @Inject('CreateSampleCommand')
    private readonly createSampleCommand: CreateSampleCommand,
    @Inject('UpdateSampleCommand')
    private readonly updateSampleCommand: UpdateSampleCommand,
    @Inject('DeleteSampleCommand')
    private readonly deleteSampleCommand: DeleteSampleCommand,
  ) {}

  @Get('/:sampleId')
  async show(@Param('sampleId') sampleId: string): Promise<SampleDto> {
    const sample = await this.getSampleQuery.execute(sampleId);
    return sample;
  }

  @Get()
  async list(): Promise<SampleDto[]> {
    const samples = await this.listSampleQuery.execute();
    return samples;
  }

  @Post()
  async create(@Body() params: CreateSampleDto): Promise<SampleDto> {
    const sample = await this.createSampleCommand.execute(params);
    return sample;
  }

  @Put('/:sampleId')
  async update(
    @Param('sampleId') sampleId: string,
    @Body() params: UpdateSampleDto,
  ): Promise<SampleDto> {
    const sample = await this.updateSampleCommand.execute(sampleId, params);
    return sample;
  }

  @Delete('/:sampleId')
  async delete(@Param('sampleId') sampleId: string): Promise<null> {
    await this.deleteSampleCommand.execute(sampleId);
    return null;
  }
}
