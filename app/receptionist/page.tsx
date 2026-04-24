import Image from 'next/image';
import Link from 'next/link';

export default function ReceptionistHomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-24 p-6 font-sans text-gray-800">
      
      {/* Logo */}
      <div className="mb-8">
         <div className="relative w-56 h-16 opacity-90">
             <Image src="/images/logo-putih.png" alt="Restify Logo" fill className="object-contain" priority />
         </div>
      </div>
      
      {/* Title */}
      <div className="text-center mb-12">
        <h1 className="text-[26px] font-bold mb-1 text-black tracking-wide">Resepsionis</h1>
        <h2 className="text-[26px] font-bold text-black tracking-wide">"Nama Hotel"</h2>
      </div>
      
      {/* Menu Buttons */}
      <div className="flex flex-col gap-5 w-full max-w-sm mb-24">
        <Link href="/receptionist/reservations" className="w-full bg-[#657657] text-white py-4 rounded-[14px] font-medium text-lg text-center hover:bg-opacity-90 transition-all shadow-sm">
          Data Reservasi
        </Link>
        <Link href="/receptionist/dataKamar" className="w-full bg-[#657657] text-white py-4 rounded-[14px] font-medium text-lg text-center hover:bg-opacity-90 transition-all shadow-sm">
          Data Kamar
        </Link>
      </div>

      {/* Logout Button */}
      <div className="w-full max-w-[200px]">
        <Link href="/login" className="block w-full bg-[#FF4500] text-white py-3 rounded-full font-bold text-[15px] tracking-wide text-center hover:bg-red-600 transition-colors shadow">
          Keluar
        </Link>
      </div>

    </div>
  );
}
