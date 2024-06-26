"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import add from "@/public/add.png";

// Define the type for the radio options
interface RadioOption {
  id: string; // Unique identifier for each radio button
  label: string; // Text displayed next to the radio button
}

// Define the type for the list items
interface ListItem {
  name: string;
  children: string[]; // Optional children for nested lists
}

const listData: ListItem[] = [
  {
    name: "ev_tech",
    children: [
      "Electric Vehicle",
      "Battery Technology and Manufacturing",
      "Charging Infrastructure",
      "EV Powertrains",
      "EV Components",
      "EV Services",
    ],
  },
  {
    name: "automotive_solutions",
    children: [
      "Passenger Vehicle",
      "Commercial Vehicle",
      "Two-Wheeler",
      "Three-Wheeler",
      "ICE Powertrains",
      "Components",
      "Tire",
      "Services",
    ],
  },
  {
    name: "shared_mobility",
    children: [
      "Car-Based Services",
      "Micro-Mobility Services",
      "Microtransit and Shuttle Services",
      "Autonomous Mobility Services",
      "Subscription and Membership Models",
      "Integrated Mobility Platforms (MaaS)",
    ],
  },
  {
    name: "electrical_electronics",
    children: [
      "ADAS",
      "Sensors",
      "ECU",
      "Electrical and Electronic Components",
    ],
  },
  {
    name: "connectivity_tech",
    children: [
      "In-Vehicle Infotainment",
      "Vehicle-to-Everything (V2X) Communications",
      "Telematics and Remote Services",
      "Connected Safety Features",
      "Vehicle Connectivity Services",
    ],
  },
  {
    name: "industrial_automotive",
    children: [
      "Agricultural Vehicles ",
      "Construction Vehicles",
      "Mining Vehicles ",
      "Warehouse Vehicles ",
      "Forestry Vehicles ",
      "Utility Vehicles ",
      "Cargo Transport Vehicles ",
      "Emergency Service Vehicles ",
      "Railway Service Vehicles ",
      "Port and Terminal Vehicles ",
    ],
  },
  {
    name: "emerging_tech",
    children: [
      "Autonomous Vehicles (AVs)",
      "Alternative Fuels and Powertrains",
      "Automotive Digital Services",
      "Artificial Intelligence (AI) and Machine Learning",
      "Lightweight and Advanced Materials",
      "Smart City Integration",
      "Sustainable Technologies",
    ],
  },
];
// Sample data for the radio buttons
const radioOptions: RadioOption[] = [
  { id: "ev_tech", label: "Electric Vehicle Technology" },
  { id: "automotive_solutions", label: "Automotive Solutions" },
  { id: "shared_mobility", label: "Shared Mobility" },
  { id: "electrical_electronics", label: "Electrical and Electronics" },
  { id: "connectivity_tech", label: "Connectivity Technology" },
  { id: "industrial_automotive", label: "Industrial Automotive Application" },
  { id: "emerging_tech", label: "Emerging Technology" },
];

export default function Upsec() {
  const [selectedOption, setSelectedOption] = useState<string>("null");
  const [subIndustries, setSubIndustries] = useState<string[]>();
  const [subIndustryOption, setSubIndustryOption] = useState<string>("null");
  const [loading1, setLoading1] = useState<boolean>(false);
  const [loading2, setLoading2] = useState<boolean>(false);
  const [imagep, setImagep] = useState<string>("");
  const [imagei, setImagei] = useState<string>("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [pricingSin, setPricingSin] = useState("");
  const [pricingTeam, setPricingTeam] = useState("");
  const [pricingCor, setPricingCor] = useState("");
  // const [date, dateChange] = useState<Date>(new Date());
  const router = useRouter();
  // console.log(selectedOption);

  const handleChangeSubIndustry = (item: string) => {
    setSubIndustryOption(item);
  };
  // console.log(" selected Sub Industry name -->" + subIndustryOption);
  // Handle change event for radio buttons
  const handleChangeIndustry = async (option: RadioOption, i: number) => {
    setSelectedOption(option.id);
    setSubIndustries(listData[i].children);

    // const foundItem = listData.find((item) => item.name === selectedOption);
    // console.log(foundItem);
  };
  // console.log(" all Sub Industries array -->" + subIndustries);

  // const [data,setData]=useState({})
  const uploadImage1 = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log("some error occured");
    console.log(files);
    const data = new FormData();
    if (files) {
      data.append("file", files[0]);
      data.append("upload_preset", "ppn3qr4u");
      setLoading1(true);

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dkzpbucfz/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const file = await res.json();
      setImagep(file.secure_url);
      console.log("we are here now ");
      console.log(file.secure_url);
      setLoading1(false);
    }
  };

  const uploadImage2 = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log("some error occured");
    console.log(files);
    const data = new FormData();
    if (files) {
      data.append("file", files[0]);
      data.append("upload_preset", "ppn3qr4u");
      setLoading2(true);

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dkzpbucfz/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const file = await res.json();
      setImagei(file.secure_url);
      console.log("we are here now ");
      console.log(file.secure_url);
      setLoading2(false);
    }
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("submit button clicked");
    console.log("image 1 is ", imagep);
    console.log("image 2 is ", imagei);
    const daata = {
      title: title,
      linkp: imagep,
      linki: imagei,
      desc: desc,
      industry: selectedOption,
      subind: subIndustryOption,
    };
    const res = await axios.post(
      "http://localhost:8800/api/upload/uploadreport",
      daata
    );
  };

  return (
    <div className="flex flex-col px-12 py-4">
      <div className=" flex">
        <div className="m-1 p-5 rounded-lg flex flex-col w-full gap-5">
          <div>
            <label
              htmlFor="title"
              className="text-lg font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="title"
              id="title"
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-600 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="">
            <label
              htmlFor="pageNo"
              className="text-lg font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="pageNo"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-600 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none h-24"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
        </div>
        {/* <div className="text-[20px] mt-11 m-2 border-2 text-center border-black bg-red-400 rounded-lg h-9 w-9">
        +
      </div> */}
      </div>

      <div className="p-4 flex justify-between border-t-2 border-b-2 gap-10">
        {/* main industry section */}
        <div className=" w-1/2 ">
          <h1 className="text-lg font-medium text-gray-700">Industry</h1>

          {radioOptions.map((option, i) => (
            <div key={option.id} className="flex items-center mb-2">
              <input
                type="radio"
                id={option.id}
                name="industry"
                value={option.id}
                checked={selectedOption === option.id}
                onChange={() => {
                  handleChangeIndustry(option, i);
                }}
                className="w-4 h-4 focus:ring-blue-500 dark:focus:ring-blue-600"
              />
              <label htmlFor={option.id} className="ml-2 ">
                {option.label}
              </label>
            </div>
          ))}
        </div>
        {/* sub industry division */}
        <div className=" m-2 w-1/2">
          {selectedOption == "null" ? null : (
            <h1 className="text-lg font-medium text-gray-700">Sub-Industry</h1>
          )}
          {subIndustries?.map((option) => (
            <div key={option} className="flex items-center mb-2">
              <input
                type="radio"
                id={option}
                name="subindustry"
                value={option}
                checked={option === subIndustryOption}
                onChange={() => handleChangeSubIndustry(option)}
                className="w-4 h-4 focus:ring-blue-500 dark:focus:ring-blue-600"
              />
              <label htmlFor={option} className="ml-2 ">
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* upload Pdf and image for the thumbnail */}
      <div className="flex self-center gap-24 my-4">
        <div className="group flex flex-col items-center gap-3 self-center">
          <label htmlFor="fileInput1">
            <Image
              src={add}
              alt="img"
              className=" hover:cursor-pointer h-[30px] w-[30px]"
            />
          </label>
          <input
            type="file"
            name="file1"
            id="fileInput1"
            // placeholder="upload your profile"
            onChange={uploadImage1}
            placeholder="Title"
            className="hidden"
          />
          <span className=" group-hover:font-bold group-hover:text-green-600 ">
            Upload PDF
          </span>
        </div>
        <div className="group flex flex-col items-center gap-3 self-center">
          <label htmlFor="fileInput2">
            <Image
              src={add}
              alt="img"
              className=" hover:cursor-pointer h-[30px] w-[30px]"
            />
          </label>
          <input
            type="file"
            name="file2"
            id="fileInput2"
            // placeholder="upload your profile"
            onChange={uploadImage2}
            placeholder="Title"
            className="hidden"
          />
          <span className=" group-hover:font-bold group-hover:text-green-600 ">
            Upload Thumbnail
          </span>
        </div>
      </div>

      {/* set pricing */}
      <div className="flex border-b-2 pb-4">
        <div className="w-1/3 mx-2">
          <label htmlFor="title" className="text-lg font-medium text-gray-700">
            Pricing for Single
          </label>
          <input
            type="title"
            id="title"
            placeholder="in dollars"
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-600 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none"
            value={pricingSin}
            onChange={(e) => setPricingSin(e.target.value)}
          />
        </div>
        <div className="w-1/3 mx-2">
          <label htmlFor="title" className="text-lg font-medium text-gray-700">
            Pricing for Team
          </label>
          <input
            type="title"
            id="title"
            placeholder="in dollars"
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-600 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none"
            value={pricingTeam}
            onChange={(e) => setPricingTeam(e.target.value)}
          />
        </div>
        <div className="w-1/3 mx-2">
          <label htmlFor="title" className="text-lg font-medium text-gray-700">
            Pricing for Corporate
          </label>
          <input
            type="title"
            id="title"
            placeholder="in dollars"
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-600 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none"
            value={pricingCor}
            onChange={(e) => setPricingCor(e.target.value)}
          />
        </div>
      </div>
      {/* <div>
        <Calendar onChange={dateChange} value={date}/>
      </div> */}

      <div>{loading1 ? <h3>loading</h3> : <img src={imagep} alt="" />}</div>
      <div>{loading2 ? <h3>loading</h3> : <img src={imagei} alt=""></img>}</div>
      <button
        onClick={handleClick}
        className="btn-blue mx-2 w-1/2 self-center mt-6 font-semibold flex justify-center border-[1px] rounded border-blue-500 p-3 hover:bg-blue-500 text-blue-500 hover:text-white hover:font-bold"
      >
        Submit
      </button>
    </div>
  );
}
