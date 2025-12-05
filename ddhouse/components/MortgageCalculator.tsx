import React, { useState, useEffect } from 'react';

interface MortgageCalculatorProps {
  initialPrice: number;
}

const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({ initialPrice }) => {
  const [price, setPrice] = useState(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5); // Default interest rate
  const [loanTerm, setLoanTerm] = useState(30); // Default 30 years

  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);
  const [downPaymentAmount, setDownPaymentAmount] = useState(0);

  useEffect(() => {
    // Recalculate whenever inputs change
    const principal = price * (1 - downPaymentPercent / 100);
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    setLoanAmount(principal);
    setDownPaymentAmount(price * (downPaymentPercent / 100));

    if (interestRate === 0) {
      setMonthlyPayment(principal / numberOfPayments);
    } else {
      const payment =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      setMonthlyPayment(payment);
    }
  }, [price, downPaymentPercent, interestRate, loanTerm]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', maximumFractionDigits: 0 }).format(value);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-soft border border-gray-100 h-full">
      <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
        </div>
        <div>
            <h3 className="text-2xl font-bold text-gray-800">คำนวณสินเชื่อบ้าน</h3>
            <p className="text-sm text-gray-500">ประเมินยอดผ่อนชำระเบื้องต้นต่อเดือน</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-5">
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">ราคาบ้าน (บาท)</label>
                <div className="relative">
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="w-full p-3 pl-4 pr-12 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-800"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">THB</span>
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex justify-between">
                    <span>เงินดาวน์ (%)</span>
                    <span className="text-primary font-bold">{downPaymentPercent}%</span>
                </label>
                <input
                    type="range"
                    min="0"
                    max="50"
                    step="5"
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="text-right text-xs text-gray-500 mt-1">
                    คิดเป็นเงิน: {formatCurrency(downPaymentAmount)}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">อัตราดอกเบี้ย (%)</label>
                    <div className="relative">
                        <input
                            type="number"
                            step="0.1"
                            value={interestRate}
                            onChange={(e) => setInterestRate(Number(e.target.value))}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-800 text-center"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">ระยะเวลา (ปี)</label>
                    <select
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(Number(e.target.value))}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-800 text-center cursor-pointer"
                    >
                        <option value="10">10 ปี</option>
                        <option value="15">15 ปี</option>
                        <option value="20">20 ปี</option>
                        <option value="25">25 ปี</option>
                        <option value="30">30 ปี</option>
                        <option value="35">35 ปี</option>
                        <option value="40">40 ปี</option>
                    </select>
                </div>
            </div>
        </div>

        <div className="bg-gradient-to-br from-primary to-red-800 rounded-2xl p-6 text-white flex flex-col justify-center items-center text-center shadow-lg relative overflow-hidden">
             {/* Decorative circles */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
             <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

             <div className="relative z-10 space-y-2">
                <span className="text-white/80 text-sm font-medium uppercase tracking-wider">ยอดผ่อนชำระต่อเดือน</span>
                <div className="text-4xl md:text-5xl font-extrabold my-2">
                    {formatCurrency(monthlyPayment)}
                </div>
                <p className="text-xs text-white/60 font-light mt-4 px-4">
                    *ราคาข้างต้นเป็นการประมาณการเท่านั้น อัตราดอกเบี้ยและยอดผ่อนจริงขึ้นอยู่กับโปรโมชั่นของแต่ละธนาคารและคุณสมบัติผู้กู้
                </p>
             </div>

             <div className="mt-6 pt-6 border-t border-white/20 w-full flex justify-between text-sm">
                <div className="text-left">
                    <div className="text-white/60 text-xs">วงเงินกู้</div>
                    <div className="font-bold">{formatCurrency(loanAmount)}</div>
                </div>
                <div className="text-right">
                    <div className="text-white/60 text-xs">เงินดาวน์</div>
                    <div className="font-bold">{formatCurrency(downPaymentAmount)}</div>
                </div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;
