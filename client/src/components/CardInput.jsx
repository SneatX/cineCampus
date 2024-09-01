import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Swal from 'sweetalert2';
import axios from 'axios';

const stripePromise = loadStripe("pk_test_51Pu4z6ENv6lYUGDbgvbG1ckBy06gIe7zaZW3ZNmMUwvh1CbXrpvlIQJ3CFKMiisdUSbn1Xu0gjhqA3mfqnIYFa4s00YfmfapxL");
import '../css/components/CardInput.css';

export function CardInput({ totalValue, buyTickets, movie }) {

    const CheckoutForm = () => {
        const stripe = useStripe();
        const elements = useElements();

        const handleSubmit = async (event) => {
            event.preventDefault();
    
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: "card",
                card: elements.getElement(CardElement)
            });

            if (!error) {
                const { id } = paymentMethod;

                try {
                    let res = await axios.post('http://localhost:3000/create-payment-intent', {
                        id,
                        amount: totalValue,
                        movie
                    });

                    console.log(res)

                    if (res.data.status !== "succeeded") {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: res.data.code,
                            footer: res.data.decline_code
                        });
                    } else {
                        Swal.fire({
                            title: "Good job!",
                            text: "You clicked the button!",
                            icon: "success"
                          });
                        //buyTickets();
                    }

                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong with the request!",
                        footer: error
                    });
                }
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Payment Error",
                    text: error.message,
                    footer: '<a href="#">Why do I have this issue?</a>'
                });
            }
        };

        return (
            <form className='cardInput-forms' onSubmit={handleSubmit}>
                <CardElement className='cardElement'></CardElement>
                <button className="payments-BuyButton">Buy ticket</button>
            </form>
        );
    };

    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm></CheckoutForm>
        </Elements>
    );
}
