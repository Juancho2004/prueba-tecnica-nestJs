import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, InternalServerErrorException } from "@nestjs/common";
import { BookService } from "./book.service";
import { Book } from "@prisma/client";


@Controller('books')
export class  BookController {

    constructor(private readonly bookService: BookService){}

    @Get()
    async getAllBooks(){
        return this.bookService.getAllTBooks()
    }

    @Post()
    async crearRegistro(@Body() data: Book): Promise<Book> {
        try {
            return this.bookService.crearNuevoRegistro(data);
        } catch (error) {
            console.error('Error al crear el registro:', error);
            throw new InternalServerErrorException('Error interno al crear el registro.');
        }
    }

    @Get(':id')
    async getBookById(@Param('id')id: string){
        const bookFound = this.bookService.getBookById(Number(id))
        if (!bookFound) throw new NotFoundException('Book does not exist')
            return bookFound;
    }
    

    @Delete(':id')
    async deleteBook(@Param('id')id: string){
        try {
            return await this.bookService.deleteBook(Number(id))
        } catch (error) {
            throw new NotFoundException('Book does not exist');
            
        }
    }


    @Put(':id')
    async updateBook(@Param('id')id: string, @Body() data:Book){

        try {
            return this.bookService.updateBooks(Number(id), data)  
        } catch (error) {
            throw new NotFoundException('Book does not exist');
        }
    }

}