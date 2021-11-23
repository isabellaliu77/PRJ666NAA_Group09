import { Accordion } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { withRouter,useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';



function FAQComponent( props) {
  const history = useHistory();
  const [faqs, setFaqs] = useState([]);

  function getFAQData() {
    return new Promise(function (resolve, reject) {
        fetch(`http://localhost:5000/faq`)
            .then(res => res.json())
            .then(result => {
                if (result) {
                  console.log(result);  
                  resolve(result);

                }
            })
    });

    
}

function deleteFAQRecord(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
   
};
  return new Promise(function (resolve, reject) {
      fetch(`http://localhost:5000/faq/${id}`, requestOptions)
          .then(res => res.json())
          .then(result => {
              if (result) {
                console.log(result);  
                resolve(result);

              }
          })
  });

  
}

function AddNewFaq(){
  history.push('/faqadd');
}

useEffect(() => {
  getFAQData().then(result => {
      if (result) {
        console.log(result);
          setFaqs(result);
      }
  });
}, []);


if (faqs.length > 0) {
 

  return (
    <>
    <button className="btn btn-success" onClick={() => {AddNewFaq();}}>Add new FAQ article</button>
    <p> </p>
      <Accordion defaultActiveKey="0">
    {faqs.map((faq) =>
    
       <Accordion.Item eventKey={faq._id} >  
          <Accordion.Header>{faq.articleTitle}</Accordion.Header>
          <Accordion.Body>{faq.body} <p></p> <button className="btn btn-outline-danger" key={faq._id} onClick={() => {if(window.confirm("Are you sure you want to delete this FAQ Article? This CANNOT be undone!")){deleteFAQRecord(faq._id); window.location.reload(false);};  }} >Delete this article</button>  <button className="btn btn-outline-primary" key={faq._id} onClick={() => { history.push(`/faqedit/${faq._id}`) }}>Edit this article</button></Accordion.Body>
          </Accordion.Item>
      
  )
  }
  
  </Accordion>

  
    </>
  );

}else{
  return (
    <>
    <p>loading please wait...</p>
    </>
);
}
   
}

export default FAQComponent;
