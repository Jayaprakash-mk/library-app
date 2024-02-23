const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const getAllBooks = async (req, res, next) => {
    const { page = 1, title, author, genere, date} = req.query;
  const itemsPerPage = 6; // Number of items per page

  try {
    const totalCount = await prisma.Books.count({
      where: {
        title: { contains: title || '' },
        author: { contains: author || '' },
        genere: { contains: genere || '' },
        
      },
    });

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    const books = await prisma.Books.findMany({
      skip: (page - 1) * itemsPerPage,
      take: itemsPerPage,
      where: {
        title: { contains: title.toLowerCase() || '' },
        author: { contains: author.toLowerCase() || '' },
        genere: { contains: genere.toLowerCase() || '' },
        
      },
    });

    res.json({
      books,
      totalPages,
    });
  } catch (error) {
    console.error('Error fetching books', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }  
}

const addNewBook = async (req, res, next) => {
    try{
        //console.log(req.body);
        const {title, author, genere, date} = req.body;
        if (date > 2024){
          return res.status(200).json({message: "year ERROR"});
        }
        const users = await prisma.Books.create({
            data : {
                title: title.toLowerCase(),
                author: author.toLowerCase(),
                genere: genere.toLowerCase(),
                date: parseInt(date)
            },
        });
        // await user.save();
        console.log(users);
        return res.status(200).json({message: "ok", users});
    } catch (err) {
        console.log(err);
        return res.status(200).json({message: "ERROR", cause: err.message});
    }   
};

module.exports = {getAllBooks, addNewBook};