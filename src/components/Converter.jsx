import React from 'react'

const converters = [
  {
    name: "Length",
    units: [
      {
        name: "Millimeter",
        value: 0.001,
        unit: "mm",
      },
      {
        name: "Centimeter",
        value: 0.01,
        unit: "cm",
      },
      {
        name: "Meter",
        value: 1,
        unit: "m",
      },
      {
        name: "Kilometer",
        value: 1000,
        unit: "km",
      },
      {
        name: "Inch",
        value: 0.0254,
        unit: "in",
      },
      {
        name: "Foot",
        value: 0.3048,
        unit: "ft",
      },
    ],
  },
  {
    name: "Area",
    units: [],
  },
  {
    name: "Volume",
    units: [],
  },
  {
    name: "Mass",
    units: [],
  },
  {
    name: "Speed",
    units: [],
  },
  {
    name: 'Pressure',
    units: [
      {
        name: "Pascal",
        value: 1,
        unit: "Pa",
      },
      {
        name: "Kilopascal",
        value: 1000,
        unit: "kPa",
      },
      {
        name: "Bar",
        value: 100000,
        unit: "bar",
      },
      {
        name: "Pound per Square Inch",
        value: 6894.757293168,
        unit: "psi",
      },
      {
        name: "Atmosphere",
        value: 101325,
        unit: "atm",
      },
      {
        name: "Torr",
        value: 133.32236842105,
        unit: "torr",
      },
    ],
  },
]


const Converter = () => {
  return (
    <div className='w-full'>
      <div className='m-auto mb-8 w-max'>
        <select className='border-none bg-transparent text-sm outline-none focus:text-black dark:focus:text-white'></select>
      </div>
    </div>
  )
}

export default Converter