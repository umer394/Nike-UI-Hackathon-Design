import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"


export default function Page() {
    return (
        <main className="max-w-[1200px] mx-auto">
            <div className="my-20">
                <section className="">
                    <h1 className="text-xl font-semibold">How would you like to get your order?</h1>
                    <p className="max-w-sm text-sm my-4">Customs regulation for India require a copy of the recipient's KYC. The address on the KYC needs to match the shipping address. Our courier will contact you via SMS/email to obtain a copy of your KYC. The KYC will be stored securely and used solely for the purpose of clearing customs (including sharing it with customs officials) for all orders and returns. If your KYC does not match your shipping address, please click the link for more information. <u> Learn More</u> </p>
                    <div className="max-w-sm border-black border-2 my-4 rounded-lg flex items-center">
                        <h4 className="text-xl font-semibold my-4 ml-4">Deliver It</h4>
                    </div>
                    <h1 className="text-xl font-semibold mt-10">Enter your name and address.</h1>
                    <div className="space-y-4 my-10">
                        <Input type="text" placeholder="First Name" className="w-96 h-12 placeholder:text-black shadow-sm  border-2" />
                        <Input type="text" placeholder="Last Name" className="w-96 h-12 placeholder:text-black shadow-sm  border-2" />
                        <Input type="text" placeholder="Address Line 1" className="w-96 h-12 placeholder:text-black shadow-sm  border-2" />
                        <Input type="text" placeholder="Address Line 2" className="w-96 h-12 placeholder:text-black shadow-sm  border-2" />
                        <Input type="text" placeholder="Address Line 3" className="w-96 h-12 placeholder:text-black shadow-sm  border-2" />
                        <div className="flex gap-6">
                            <Input type="number" placeholder="Postal Code" className="w-[180px]  h-12 placeholder:text-black shadow-sm  border-2" />
                            <Input type="text" placeholder="Locality" className="w-[180px] h-12 placeholder:text-black shadow-sm  border-2" />
                        </div>
                        <div className="flex gap-6">


                            <Input type="" placeholder="Pakistan" disabled className="w-[180px] h-12 placeholder:text-black shadow-sm  border-2" />
                            <Select>
                                <SelectTrigger className="w-[180px] h-12">
                                    <SelectValue placeholder="State" className="placeholder:text-black" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="PB">Punjab</SelectItem>
                                    <SelectItem value="SD">Sindh</SelectItem>
                                    <SelectItem value="BL">Balochistan</SelectItem>
                                    <SelectItem value="KPK">Khyber Pakhtunkhwa</SelectItem>
                                    <SelectItem value="GB">Gilgit-Baltistan</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col text-black gap-4 gap-y-6 my-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="terms" />
                                <label
                                    htmlFor="terms"
                                    className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Save this address to my profile
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="terms" />
                                <label
                                    htmlFor="terms"
                                    className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Make this my preferred address
                                </label>
                            </div>
                        </div>


                    </div>
                </section>
                <section></section>
            </div>
        </main>
    )
}