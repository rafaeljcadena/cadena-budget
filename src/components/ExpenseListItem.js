import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const ExpenseListItem = (props) => {
  const { id, description, amount, createdAt } = props;
  return (
    <div>
      <Link to={`/edit/${id}`}>
        <h3>{description}</h3>
      </Link>
      <p>R${amount} - {moment(createdAt).format("Do MMMM YYYY")}</p>
      
      <Link to={`/edit/${id}`}>
        <button>Edit</button>
      </Link>
    </div>
  );
}

export default ExpenseListItem;