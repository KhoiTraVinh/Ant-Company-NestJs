import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lop, LopDocument } from './lop.schema';

@Injectable()
export class LopService {
    constructor(@InjectModel(Lop.name) private Model: Model<LopDocument>) { }



    async getAll(): Promise<Lop[]>{
        const data = await this.Model.find().exec();
        return data;
    }


    async create(name: String): Promise<Lop> {
        try{
            const data = await new this.Model({
                name
            });
            data.save();
            return data;

        }catch(e)
        {
            return e;
        }
    }

    async update(id: String, name: String): Promise<String>{
        try{
            const data = await this.Model.findById(id);
            if(data)
            {
                await this.Model.updateOne({name : name});
                return "Update Success";
            }
        }catch(e){
            return e;
        }
            
    }

    async delete(id: String): Promise<String>{
        try{
            const data = await this.Model.findById(id);
            if(data){
                await this.Model.deleteOne({id});
                return "Delete Success"
            }
        }catch(e)
        {
            return e;
        }
    }
}
