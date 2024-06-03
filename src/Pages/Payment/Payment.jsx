/* eslint-disable no-unused-vars */
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import { Cell, Legend, Pie, PieChart } from "recharts";
import PageTitle from "../../Components/PageTitle/PageTitle";
import CheckoutForm from "./CheckoutForm";

// todo
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { data: paymentData, isLoading: isPaymentDataLoading } = useQuery({
        queryKey: ['payment-data', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/scholarships/${id}`);
            return data;
        }
    });

    if (isPaymentDataLoading) {
        return <div>Loading...</div>;
    }

    const { tuitionFees, serviceCharge, applicationFees, universityName } = paymentData;
    const tuitionFeesFloat = parseFloat(tuitionFees) || 0;
    const serviceChargeFloat = parseFloat(serviceCharge) || 0;
    const applicationFeesFloat = parseFloat(applicationFees) || 0;

    // Calculate the total fees
    const totalFees = tuitionFeesFloat + serviceChargeFloat + applicationFeesFloat;

    // PieChart data
    const pieChartData = [
        { name: 'Tuition Fees', value: tuitionFeesFloat },
        { name: 'Service Charge', value: serviceChargeFloat },
        { name: 'Application Fees', value: applicationFeesFloat },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div>
            <PageTitle title={'Payment'}></PageTitle>
            <div className="flex items-center justify-center w-full">
                <h2 className="text-2xl border-t-2 rounded-es-xl rounded-se-xl border-blue-500 border-b-2 py-3 text-center w-80 font-extrabold text-blue-500 bg-black bg-opacity-15">
                    Payment for {paymentData.scholarshipName}
                </h2>
            </div>
            <div className=" flex items-center md:justify-between gap-2 flex-col md:flex-row">
                <div className="">
                    <h2 className="text-xl">Total Price: ${totalFees}</h2>
                </div>
                <div className="">
                    <PieChart width={400} height={400}>
                        <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend />
                    </PieChart>
                </div>
            </div>
            <Elements stripe={stripePromise}>
                <CheckoutForm paymentData={paymentData} totalFees={totalFees} />
            </Elements>
        </div>
    );
};

export default Payment;
