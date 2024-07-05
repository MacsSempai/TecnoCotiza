import React from "react";


const CategoriaFiltro =({categorias, categoriaSelec, onChange})=>{
    return(
        <select value={categoriaSelec} onChange={onChange}>
            <option value="">Todas las Categorias</option>
            {categorias.map((categoria, index)=>(
                <option key={index} value={categoria}>{categoria}</option>
            ))}
        </select>
    );
};


export default CategoriaFiltro