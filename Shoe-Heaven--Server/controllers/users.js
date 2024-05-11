import { db } from "../db.js"


export const getUsers = (req,res) =>{

    const query = 'SELECT * FROM users'; 
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Failed to fetch users' });
        return;
      }
      res.json(results);
    });
}

export const deleteUser = (req,res) =>{
   const userId = req.params.id;
   const sql = 'DELETE FROM users WHERE id=?';

   db.query(sql,[userId],(err,result) =>{
    if (err) {
      console.error('Error deleting user:', err);
      return res.status(500).json({ message: 'Failed to delete the user' });
  }
  if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
  }
  res.json({ message: 'User deleted successfully' });
   })
}


