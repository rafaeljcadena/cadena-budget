import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import numeral from 'numeral'

// numeral.locale('pt-br');

const ExpenseListItem = (props) => {
  const { id, description, amount, createdAt } = props;
  return (
    <div>
      <Link to={`/edit/${id}`}>
        <h3>{description}</h3>
      </Link>
      <p>{numeral(amount / 100).format('$0,0.00')} - {moment(createdAt).format("Do MMMM YYYY")}</p>
      
      <Link to={`/edit/${id}`}>
        <button>Edit</button>
      </Link>
    </div>
  );
}

export default ExpenseListItem;