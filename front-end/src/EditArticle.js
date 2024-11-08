import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditArticle({ articleId, setEditMode, fetch }) {
  const [article, setArticle] = useState({
    name: '',
    category: '',
    brand: '',
    price: '',
    content: '',
    stock: '',
    online: false,
    picture: { img: '' }
  });

  const get = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/article/get/${articleId}`);
      setArticle(response.data);
    } catch (error) {
      console.error("T'es mauvais bg");
    }
  };

  const update = async (e) => {
    e.preventDefault();
    try {
      const updatedArticle = { ...article };
      // Si le champ de l'image est vide, on ne l'inclut pas dans la mise à jour
      if (!updatedArticle.picture.img) {
        delete updatedArticle.picture; // On supprime la propriété picture si elle est vide
      }
      await axios.put(`http://localhost:8000/api/article/update/${articleId}`, updatedArticle);
      fetch();
      setEditMode(false);
    } catch (error) {
      console.error("T'es mauvais bg");
    }
  };

  useEffect(() => {
    get();
  }, [articleId]);

  return (
    <div>
      <h2>Modifier l'article</h2>
      <form onSubmit={update}>
        <input 
          type="text" 
          placeholder="Nom de l'article" 
          value={article.name} 
          onChange={(e) => setArticle({ ...article, name: e.target.value })}
          required 
        />
        <input 
          type="text" 
          placeholder="Catégorie" 
          value={article.category} 
          onChange={(e) => setArticle({ ...article, category: e.target.value })}
          required 
        />
        <input 
          type="text" 
          placeholder="Marque" 
          value={article.brand} 
          onChange={(e) => setArticle({ ...article, brand: e.target.value })}
          required 
        />
        <input 
          type="number" 
          placeholder="Prix" 
          value={article.price} 
          onChange={(e) => setArticle({ ...article, price: e.target.value })}
          required 
        />
        <input 
          type="text" 
          placeholder="Contenu" 
          value={article.content} 
          onChange={(e) => setArticle({ ...article, content: e.target.value })}
          required 
        />
        <input 
          type="number" 
          placeholder="Stock" 
          value={article.stock} 
          onChange={(e) => setArticle({ ...article, stock: e.target.value })}
          required 
        />
        <input 
          type="checkbox" 
          checked={article.online} 
          onChange={() => setArticle({ ...article, online: !article.online })}
        /> En ligne
        <input 
          type="text" 
          placeholder="Image principale (optionnelle)" 
          value={article.picture.img} 
          onChange={(e) => setArticle({ ...article, picture: { img: e.target.value } })}
        />
        <button type="submit">Mettre à jour l'article</button>
      </form>
      <button onClick={() => setEditMode(false)}>Annuler</button>
    </div>
  );
}

export default EditArticle;
