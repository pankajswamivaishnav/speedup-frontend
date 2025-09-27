import BiltyDocument from 'components/Bilty/BiltyDocument';

const sampleBiltyData: any = {
  company: {
    name: 'Shree Krishna Transport',
    branchCode: '3435',
    gstNo: 'PSV1310',
    panNo: 'CQHPV51671',
    address: 'New Bypass Road, Devnagar, Ganheda Road, Pushkar, Pushkar, Rajasthan - 305022',
    email: 'pankajvaishnav128@gmail.com',
    website: 'pankaj-swami-vaishnav.onrender.com',
    phone: '707327213'
  },
  lrDate: '31-08-2025',
  lrNo: '1',
  truckVehicleNo: 'RJ-01GB-1737',
  transportMode: 'By Road',
  from: 'Pushkar',
  to: 'Tamilnadu',
  deliveryType: 'Door',
  paymentStatus: 'Paid',
  consignor: {
    name: 'Deepak Swami Vaishnav',
    gstNo: 'CQHPV516712',
    mobile: '9352673924',
    address: 'Maali Mohalla Banseli, Ajmer, Rajasthan, India - 35012'
  },
  consignee: {
    name: 'Sugan Singh',
    gstNo: '78444458545',
    mobile: '0145277308',
    address: 'jaipur, A.Thirumuruganpoondi, Tamil Nadu, India - 85442'
  },
  insuranceDetails: 'Insurance details is not available or not insured.',
  items: [
    {
      srNo: 1,
      productMaterial: 'Vegetables',
      packagingType: 'Box',
      hsnCode: '-',
      articles: '0.00 KG',
      actualWeight: '0.00 KG',
      chargeRate: '₹ 100,000.00/KG',
      freightRate: '',
      packingUnpackingCharge: ''
    }
  ],
  charges: {
    serviceCharge: 0,
    loadingUnloadingCharge: 0,
    codDodCharge: 0,
    otherCharges: 0,
    subtotal: 0,
    sgstRate: 0.0,
    sgstAmount: 0,
    cgstRate: 0.0,
    cgstAmount: 0,
    totalFreight: 0,
    advancePaid: 0,
    remainingPayableAmount: 0,
    gstPayableBy: 'Consignee',
    total: 0,
    remainingAmountToBePaidBy: 'Consignor'
  },
  weightGuarantee: '100.00 MTS',
  serviceArea: 'All India',
  otherRemarks: '',
  receiverComments: '3,300,064',
  bankDetails: {
    bankName: '',
    accountNo: '',
    ifsc: ''
  }
};

const BiltyDocumentPage = () => {
  return (
    <>
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-transport-header mb-2">Bilty Document Component</h1>
            <p className="text-lg text-muted-foreground">Professional transport document with MUI & Tailwind CSS</p>
          </div>
          <BiltyDocument data={sampleBiltyData} className="mb-8" />
        </div>
      </div>
    </>
  );
};

export default BiltyDocumentPage;
