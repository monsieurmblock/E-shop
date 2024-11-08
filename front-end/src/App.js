import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditArticle from './EditArticle';

function App() {
  const [articles, setArticles] = useState([]);
  const [newArticle, setNewArticle] = useState({
    name: '',
    category: '',
    brand: '',
    price: '',
    content: '',
    stock: '',
    online: false,
    picture: [{ img: {} }]
  });

  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [viewMode, setViewMode] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);

  const fetch = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/article/get');
      setArticles(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des articles");
    }
  };

  const add = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/article/add', newArticle);
      fetch();
      setNewArticle({ name: '', category: '', brand: '', price: '', content: '', stock: '', online: false, picture: { img: '' } });
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'article");
    }
  };

  const del = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/article/delete/${id}`);
      fetch();
    } catch (error) {
        console.error("Erreur lors de la suppression de l'article");
    }
  };

  const edit = (id) => {
    setEditMode(true);
    setCurrentId(id);
  };

  const view = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/article/get/${id}`);
      setCurrentArticle(response.data);
      setViewMode(true);
    } catch (error) {
      console.error("t'es grave guez");
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      <h1>CRUD</h1>
      <h2>Articles</h2>

      <form onSubmit={add}>
        <input type="text" placeholder="Nom" value={newArticle.name} onChange={(e) => setNewArticle({ ...newArticle, name: e.target.value })} required />
        <input type="text" placeholder="Catégorie" value={newArticle.category} onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })} required />
        <input type="text" placeholder="Marque" value={newArticle.brand} onChange={(e) => setNewArticle({ ...newArticle, brand: e.target.value })} required />
        <input type="number" placeholder="Prix" value={newArticle.price} onChange={(e) => setNewArticle({ ...newArticle, price: e.target.value })} required />
        <input type="text" placeholder="Contenu" value={newArticle.content} onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })} required />
        <input type="number" placeholder="Stock" value={newArticle.stock} onChange={(e) => setNewArticle({ ...newArticle, stock: e.target.value })} required />
        <input type="checkbox" checked={newArticle.online} onChange={() => setNewArticle({ ...newArticle, online: !newArticle.online })} /> En ligne
        <input type="text" placeholder="Image principale" value={newArticle.picture.img} onChange={(e) => setNewArticle({ ...newArticle, picture: { img: e.target.value } })} required />
        <button type="submit">Ajouter l'article</button>
      </form>

      <ul>
        {articles.map((article) => (
          <li key={article._id}>
            <h3>{article.name}</h3>
            <button onClick={() => edit(article._id)}>Modifier</button>
            <button onClick={() => del(article._id)}>Supprimer</button>
            <button onClick={() => view(article._id)}>Voir</button>
          </li>
        ))}
      </ul>

      {editMode && currentId && (
        <EditArticle articleId={currentId} setEditMode={setEditMode} fetch={fetch} />
      )}

      {viewMode && currentArticle && (
        <div>
          <h2>Détails de l'article</h2>
          <p><strong>Nom:</strong> {currentArticle.name}</p>
          <p><strong>Catégorie:</strong> {currentArticle.category}</p>
          <p><strong>Marque:</strong> {currentArticle.brand}</p>
          <p><strong>Prix:</strong> {currentArticle.price}</p>
          <p><strong>Contenu:</strong> {currentArticle.content}</p>
          <p><strong>Stock:</strong> {currentArticle.stock}</p>
          <p><strong>En ligne:</strong> {currentArticle.online ? "Oui" : "Non"}</p>
          <img 
              src={currentArticle.picture[0].img} 
              alt={currentArticle.name} 
              style={{ width: '200px', height: 'auto', marginTop: '10px' }} 
            />
          <button onClick={() => setViewMode(false)}>Fermer</button>
        </div>
      )}
    </div>
  );
}

export default App;
