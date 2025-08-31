const OrderDetails = () => {
    return (
        <div style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
            <div style={{ background: 'white', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', padding: '2.5rem 2rem', maxWidth: '500px', width: '100%' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#2d3748', marginBottom: '1.5rem', textAlign: 'center' }}>Order Details</h1>
                <p style={{ color: '#718096', textAlign: 'center' }}>Your order details will appear here. (Add order summary, shipping info, and status as needed.)</p>
            </div>
        </div>
    );
}

export default OrderDetails;