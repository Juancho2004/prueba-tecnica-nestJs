import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Book } from "@prisma/client";

@Injectable()

export class BookService {

    constructor(private prisma: PrismaService){}

    async getAllTBooks(): Promise<Book[]>{
       return this.prisma.book.findMany();
    }


    async getBookById(id: number): Promise<Book>{
       return this.prisma.book.findUnique({
        where: {
            id: id
        }
       });
    }


    async crearNuevoRegistro(data: Book): Promise<Book> {
      console.log('Datos en el servicio:', data);
      return this.prisma.book.create({
        data,
      });
    }


    async updateBooks(id: number, data: Book): Promise<Book>{
       return this.prisma.book.update({
        where: {
            id
        },
        data
       }); 
    }


    async deleteBook(id: number): Promise<Book>{
       return this.prisma.book.delete({
         where: {
            id
         }
       })
    }
   
}