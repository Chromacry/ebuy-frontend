import React from 'react';
import "./Dashboard.scss"
import { deleteAccountApi } from '../../services/APIs/UserApi';


const Dashboard= () => {
  const DeleteAccount =async () => {
    if(window.confirm('Are you sure to delete your account?')){
      const response = await deleteAccountApi();
      if (response.status === 200){
 
        setTimeout(() => {
          alert("Deleted Successfully!");
          localStorage.removeItem("userInfo");
            window.location.href = "/";
        }, 1500);
      }
      else{
        alert(response.message)
      }
  }}
  return <div className='dashboardContainer'>
  {/* <div className="GridItem"><DepartmentChart/></div> */}
  <div className="GridItem"><button onClick={DeleteAccount}>Delete Account</button></div>
  <div className="GridItem">Test</div>
  <div className="GridItem">Dashboard Component Content Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores modi iusto deleniti officiis, fuga beatae adipisci porro eveniet culpa officia, sit minus incidunt voluptatibus fugit doloribus facilis et recusandae quam. Lorem ipsum dolosit, amet consectetur adipisicing elit. Blanditiis similique commodi illo placeat magnam,od magni quas nisi quia, consequuntur ipsam sint sequi quasi. Repellat quae sed molestias dolor cum possimus suscipit optio ducimus cumque quidem!Lorem</div>
  <div className="GridItem">Dashboard Component Content Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores modi iusto deleniti officiis, fuga beatae adipisci porro eveniet culpa officia, sit minus incidunt voluptatibus fugit doloribus facilis et recusandae quam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod iste nam autem, perspiciatis molestias cumque illo quam consequuntur dolore quis, necessitatibus fugit, ad voluptatem deleniti rerum. Iure sunt facere pariatur? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis similique commodi illo placeat magnam, quod debitis alias numquam praesentium dicta eaque expedita iste quis consequatur tempora veritatis ex saepe assumenda. Loa, consequuntur ipsam sint sequi quasi. Repellat quae sed molestias dolor cum possimus suscipit optio ducimus cumque quidem!Lorem</div>

  <div className="GridItem">Dashboard Component Content Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores modi iusto deleniti officiis, fuga beatae adipisci porro eveniet culpa officia, sit minus incidunt voluptatibus fugit doloribus facilis et recusandae quam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod iste nam autem, perspiciatis molestias cumque illo quam consequuntur dt amet consectetur adipisicing elit. Quod magni quas nisi quia, consequuntur ipsam sint sequi quasi. Repellat quae sed molestias dolor cum possimus suscipit optio ducimus cumque quidem!Lorem</div></div>;
};

export default Dashboard