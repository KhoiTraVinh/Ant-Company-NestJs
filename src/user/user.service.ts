import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { bcrypt } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private Model: Model<UserDocument>) { }
    async create(name: String, age: Number, lop: String ): Promise<User> {
        try{
            const created = new this.Model({
                name,
                age,
                lop,
            });
            return created.save();
        }catch(e){
            return e;
        }
        
    }

    async findAll(): Promise<User[]> {
        try{
            return this.Model.find().exec();
        }catch(e){
            return e;
        }
        
    }
    async Update(id: String, name: String, age: Number, lop: String): Promise<any> {
        const data = await this.Model.findById(id);
        try{
            if(data){
                if(data.name != name){
                    await this.Model.updateOne({name : name});
                }
                if(data.age != age){
                    await this.Model.updateOne({age : age});
                }
                if(data.lop){
                    await this.Model.updateOne({lop : lop});
                }
                return "Update Success";
            }
            else{
                return "Not Found";
            }
        }
        catch(e){
            return e;
        }
        
    }
    async Delete(id: String): Promise<any> {
        const data = await this.Model.findById(id);
        try{
            if(data){
                await this.Model.deleteOne({id});
                return "Delete Success";
            }
            else{
                return "Not Found";
            }
        }
        catch(e)
        {
            return e;
        }
        
    }
    async findOne(name: String, pass: String): Promise<any>{
        const data = await this.Model.findOne({name : name, age: pass})
        try{
            if(data){
                return true;
            }
            else{
                return "Account not exit";
            }
        }
        catch(e)
        {
            return e;
        }
    }


}
