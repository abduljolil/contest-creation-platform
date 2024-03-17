import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex justify-center items-center ">
       
        <div className="flex flex-col justify-center items-center">
        <img src="https://i.ibb.co/f0whJfC/error-404-concept-illustration-114360-1811.jpg" alt="" />
        <p><button className='btn btn-error'><Link to='/'className="text-3xl font-extrabold " >Go beak to home</Link></button> </p>
        </div>
         
          
    </div>
    );
};

export default ErrorPage;