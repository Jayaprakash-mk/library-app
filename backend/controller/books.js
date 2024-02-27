const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const axios = require('axios');
const dns = require('dns').promises;


const getAllBooks = async (req, res, next) => {
    const { page = 1, title, author, genere} = req.query;
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
        console.log(req.body);
        const {title, author, genere, date, onlinePurchaseLink} = req.body;
        if (date > 2024){
          return res.status(200).json({message: "year ERROR"});
        }

        const isValidLinkFormat = /^(ftp|http|https):\/\/[^ "]+$/.test(onlinePurchaseLink);
        
        if (onlinePurchaseLink && !isValidLinkFormat) {
          return res.status(200).json({ message: "Invalid URL format for onlinePurchaseLink" });
        }

        if (onlinePurchaseLink) {
          try {
            
            const parsedUrl = new URL(onlinePurchaseLink);
            const domain = parsedUrl.hostname;
            
            console.log(domain);
            
            const result = await dns.resolve4(domain);
        
            
            console.log(`DNS resolution successful for ${domain}`);
            console.log(result);
            //res.status(200).json({ success: true, result });
          } catch (error) {
            
            if (error.code === 'ENODATA' || error.code === 'ENOTFOUND') {
              return res.status(200).json({ message: 'Error in DNS' });
            } else {
              return res.status(200).json({ message: 'Error in DNS', details: error.message });
            }
          }
        }

        const users = await prisma.Books.create({
            data : {
                title: title.toLowerCase(),
                author: author.toLowerCase(),
                genere: genere.toLowerCase(),
                date: parseInt(date),
                onlinePurchaseLink: onlinePurchaseLink,
            },
        });
        //await user.save();
        console.log(users);
        return res.status(200).json({message: "ok", users});
    } catch (err) {
        console.log(err);
        return res.status(200).json({message: "ERROR", cause: err.message});
    }   
};

module.exports = {getAllBooks, addNewBook};