import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

interface BiltyDocumentProps {
  data: any;
  className?: string;
}

const BiltyDocument: React.FC<BiltyDocumentProps> = ({ data, className = '' }) => {
  const theme = useTheme();
  console.log('theme', theme);
  return (
    <div className={`${className} max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden`}>
      {/* Header Section */}
      <Box
        className="bg-transport-header text-transport-header-foreground p-6"
        sx={{ backgroundColor: theme.palette.primary.main, color: 'white' }}
      >
        <h1 className="text-3xl font-bold text-center mb-2">{data.company.name}</h1>
        <p className="text-center opacity-90 mb-4">Providing The Best Services & IT Solutions</p>
        <div className="flex justify-between items-center text-sm">
          <span>Branch Code: {data.company.branchCode || 'N/A'}</span>
          <span>GST No.: {data.company.gstNo || 'N/A'}</span>
        </div>
      </Box>

      {/* Company Contact Details */}
      <div className="bg-primary p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-primary-foreground">
          <div>
            <p>
              <strong>Address:</strong> {data.company.address}
            </p>
            {data.company.email && (
              <p>
                <strong>Email:</strong> {data.company.email}
              </p>
            )}
          </div>
          <div>
            {data.company.website && (
              <p>
                <strong>Website:</strong> {data.company.website}
              </p>
            )}
            {data.company.phone && (
              <p>
                <strong>Phone:</strong> {data.company.phone}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* LR Details Section */}
      <div className="border border-border rounded-lg p-4 m-4">
        <h2 className="text-xl font-semibold mb-4 text-transport-header">Lorry Receipt Details</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-muted-foreground font-medium">LR Date</p>
            <p className="font-semibold">{data.lrDate}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">LR No</p>
            <p className="font-semibold text-bilty-accent">{data.lrNo}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">Vehicle No</p>
            <p className="font-semibold">{data.truckVehicleNo}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">Payment Status</p>
            <span
              className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                data.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {data.paymentStatus}
            </span>
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">Route</p>
            <p className="font-semibold">
              {data.from} → {data.to}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">Transport Mode</p>
            <p>
              {data.transportMode} | {data.deliveryType}
            </p>
          </div>
        </div>
      </div>

      {/* Consignor and Consignee */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-4">
        <div className="border border-border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3 text-transport-header">Consignor (Sender)</h3>
          <p className="font-semibold mb-1">{data.consignor.name}</p>
          <p className="text-sm text-muted-foreground mb-1">GST: {data.consignor.gstNo || 'N/A'}</p>
          <p className="text-sm text-muted-foreground mb-1">Mobile: {data.consignor.mobile || 'N/A'}</p>
          <p className="text-sm text-muted-foreground">{data.consignor.address}</p>
        </div>
        <div className="border border-border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3 text-transport-header">Consignee (Receiver)</h3>
          <p className="font-semibold mb-1">{data.consignee.name}</p>
          <p className="text-sm text-muted-foreground mb-1">GST: {data.consignee.gstNo || 'N/A'}</p>
          <p className="text-sm text-muted-foreground mb-1">Mobile: {data.consignee.mobile || 'N/A'}</p>
          <p className="text-sm text-muted-foreground">{data.consignee.address}</p>
        </div>
      </div>

      {/* Items Table */}
      <div className="m-4">
        <h3 className="text-lg font-semibold mb-3 text-transport-header">Items/Materials</h3>
        <div className="overflow-x-auto">
          <table className="w-full border border-border rounded-lg overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="border border-border px-4 py-2 text-left font-semibold">Sr</th>
                <th className="border border-border px-4 py-2 text-left font-semibold">Product/Material</th>
                <th className="border border-border px-4 py-2 text-left font-semibold">Packaging Type</th>
                <th className="border border-border px-4 py-2 text-left font-semibold">HSN Code</th>
                <th className="border border-border px-4 py-2 text-left font-semibold">Articles</th>
                <th className="border border-border px-4 py-2 text-left font-semibold">Actual Weight</th>
                <th className="border border-border px-4 py-2 text-left font-semibold">Charge Rate</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item: any, index: any) => (
                <tr key={index} className="hover:bg-muted/50">
                  <td className="border border-border px-4 py-2">{item.srNo}</td>
                  <td className="border border-border px-4 py-2 font-medium">{item.productMaterial}</td>
                  <td className="border border-border px-4 py-2">{item.packagingType}</td>
                  <td className="border border-border px-4 py-2">{item.hsnCode || '-'}</td>
                  <td className="border border-border px-4 py-2">{item.articles}</td>
                  <td className="border border-border px-4 py-2">{item.actualWeight}</td>
                  <td className="border border-border px-4 py-2 font-semibold text-bilty-accent">{item.chargeRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charges Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-4">
        <div className="md:col-span-2 border border-border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3 text-transport-header">Charges Breakdown</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span>Service Charge:</span>
            <span className="text-right">₹{data.charges.serviceCharge}</span>
            <span>Loading & Unloading:</span>
            <span className="text-right">₹{data.charges.loadingUnloadingCharge}</span>
            <span>Other Charges:</span>
            <span className="text-right">₹{data.charges.otherCharges}</span>
            <hr className="col-span-2 my-2" />
            <span>Subtotal:</span>
            <span className="text-right">₹{data.charges.subtotal}</span>
            <span>SGST ({data.charges.sgstRate}%):</span>
            <span className="text-right">₹{data.charges.sgstAmount}</span>
            <span>CGST ({data.charges.cgstRate}%):</span>
            <span className="text-right">₹{data.charges.cgstAmount}</span>
          </div>
        </div>
        <Box className="bg-bilty-accent/10 border border-yellow-300 rounded-lg p-4" sx={{ backgroundColor: 'hsl(43 91% 95% / 1)' }}>
          <h3 className="text-lg font-semibold mb-3 text-bilty-accent-foreground">Total Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-semibold">Total Freight:</span>
              <span className="font-semibold">₹{data.charges.totalFreight}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Advance Paid:</span>
              <span>₹{data.charges.advancePaid}</span>
            </div>
            <hr />
            <div className="flex justify-between">
              <span className="text-lg font-bold text-bilty-accent-foreground">Balance:</span>
              <span className="text-lg font-bold text-bilty-accent-foreground">₹{data.charges.remainingPayableAmount}</span>
            </div>
            <p className="text-xs text-muted-foreground">GST Payable by: {data.charges.gstPayableBy}</p>
          </div>
        </Box>
      </div>

      {/* Footer Information */}
      <div className="bg-muted p-4 m-4 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            {data.weightGuarantee && (
              <p className="mb-1">
                <strong>Weight Guarantee:</strong> {data.weightGuarantee}
              </p>
            )}
            {data.serviceArea && (
              <p className="mb-1">
                <strong>Service Area:</strong> {data.serviceArea}
              </p>
            )}
            {data.insuranceDetails && (
              <p className="text-destructive">
                <strong>Insurance:</strong> {data.insuranceDetails}
              </p>
            )}
          </div>
          <div>
            {data.otherRemarks && (
              <p className="mb-1">
                <strong>Other Remarks:</strong> {data.otherRemarks}
              </p>
            )}
            {data.receiverComments && (
              <p>
                <strong>Receiver's Comments:</strong> {data.receiverComments}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Company Footer */}
      <div className="text-center p-4 border-t border-border">
        <p className="text-sm text-muted-foreground mb-1">For {data.company.name}</p>
        <p className="text-xs text-muted-foreground">
          AT OWNER'S RISK - Without the consignee's written permission this consignment will not be diverted, rerouted, or rebooked
        </p>
      </div>
    </div>
  );
};

export default BiltyDocument;
