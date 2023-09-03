import axios from "axios";
import "./App.scss";
import TheHeader from "./components/Header/index";
import Item from "./components/Item/index";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState<any[]>([]);
  const [quantity, setQuantity] = useState<number>(0);
  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/todos`)
      .then((res) => {
        setData(res.data);
        setQuantity(res.data.length);
      })
      .catch((err) => console.log(err));
  }, []);

  async function toggleCompleted(id: string, todoCompleted: boolean) {
    try {
      const updatedCompletedStatus = !todoCompleted;
      await axios
        .put(`https://jsonplaceholder.typicode.com/todos/${id}`, {
          completed: updatedCompletedStatus,
        })
        .then((res) => {
          const updatedData = data.map((item) =>
            item.id === id
              ? { ...item, completed: res.data.completed }
              : item
          );
          setData(updatedData);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="app">
      <TheHeader quantity={quantity} />
      <div className="item_wrapper">
        {data &&
          data.map((item) => (
            <Item key={item.id} toggleCompleted={toggleCompleted} todo={item} />
          ))}
      </div>
    </div>
  );
}

export default App;
