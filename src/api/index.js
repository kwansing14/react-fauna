import { client, q } from '../config/db';

export const getAllExpenses = client
	.query(q.Paginate(q.Match(q.Ref('indexes/all_expenses'))))
  .then(response => {
    const expenseRef = response.data;
    const getAllDataQuery = expenseRef.map(ref => {
      return q.Get(ref);
    });
    return client.query(getAllDataQuery).then(data => data);
  })
  .catch(error => console.error('Error: ', error.message));

export const createExpenseItem = name =>
client
.query(
    q.Create(q.Collection('expenses'), {
    data: {
        name
    }
    })
)
.then(ret => ret)
.catch(error => console.error('Error: ', error.message));

export const deleteExpenseItem = expenseId =>
  client
    .query(q.Delete(q.Ref(q.Collection('expenses'), expenseId)))
    .then(ret => ret)
    .catch(error => console.error('Error: ', error.message));