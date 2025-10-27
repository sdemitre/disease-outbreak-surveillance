// Global variables
let map;
let outbreakMarkers = [];
let researchData = [];
let filteredResearchData = [];

// Mock outbreak data
const outbreakData = [
    {
        id: 1,
        disease: "H5N1 Influenza",
        type: "viral",
        country: "Vietnam",
        region: "Southeast Asia",
        city: "Ho Chi Minh City",
        lat: 10.8231,
        lng: 106.6297,
        confirmedCases: 156,
        suspectedCases: 89,
        deaths: 12,
        severity: "high",
        transmissionMode: "airborne",
        lastUpdated: "2025-10-25",
        description: "Avian influenza outbreak in poultry markets spreading to humans"
    },
    {
        id: 2,
        disease: "Dengue Fever",
        type: "viral",
        country: "Brazil",
        region: "South America",
        city: "São Paulo",
        lat: -23.5505,
        lng: -46.6333,
        confirmedCases: 2341,
        suspectedCases: 1876,
        deaths: 34,
        severity: "medium",
        transmissionMode: "vector-borne",
        lastUpdated: "2025-10-24",
        description: "Seasonal dengue outbreak during rainy season"
    },
    {
        id: 3,
        disease: "Cholera",
        type: "bacterial",
        country: "Nigeria",
        region: "West Africa",
        city: "Lagos",
        lat: 6.5244,
        lng: 3.3792,
        confirmedCases: 445,
        suspectedCases: 201,
        deaths: 18,
        severity: "high",
        transmissionMode: "waterborne",
        lastUpdated: "2025-10-25",
        description: "Water contamination following flooding events"
    },
    {
        id: 4,
        disease: "Mpox",
        type: "viral",
        country: "Democratic Republic of Congo",
        region: "Central Africa",
        city: "Kinshasa",
        lat: -4.4419,
        lng: 15.2663,
        confirmedCases: 234,
        suspectedCases: 167,
        deaths: 8,
        severity: "medium",
        transmissionMode: "contact",
        lastUpdated: "2025-10-23",
        description: "Community transmission in urban areas"
    },
    {
        id: 5,
        disease: "Malaria",
        type: "parasitic",
        country: "India",
        region: "South Asia",
        city: "Mumbai",
        lat: 19.0760,
        lng: 72.8777,
        confirmedCases: 1876,
        suspectedCases: 934,
        deaths: 23,
        severity: "medium",
        transmissionMode: "vector-borne",
        lastUpdated: "2025-10-24",
        description: "Increased incidence during monsoon season"
    },
    {
        id: 6,
        disease: "Marburg Virus",
        type: "viral",
        country: "Uganda",
        region: "East Africa",
        city: "Kampala",
        lat: 0.3476,
        lng: 32.5825,
        confirmedCases: 43,
        suspectedCases: 28,
        deaths: 21,
        severity: "high",
        transmissionMode: "contact",
        lastUpdated: "2025-10-25",
        description: "Hemorrhagic fever outbreak with high mortality"
    },
    {
        id: 7,
        disease: "Yellow Fever",
        type: "viral",
        country: "Colombia",
        region: "South America",
        city: "Bogotá",
        lat: 4.7110,
        lng: -74.0721,
        confirmedCases: 89,
        suspectedCases: 45,
        deaths: 12,
        severity: "medium",
        transmissionMode: "vector-borne",
        lastUpdated: "2025-10-23",
        description: "Jungle yellow fever spreading to urban areas"
    },
    {
        id: 8,
        disease: "Typhoid Fever",
        type: "bacterial",
        country: "Pakistan",
        region: "South Asia",
        city: "Karachi",
        lat: 24.8607,
        lng: 67.0011,
        confirmedCases: 567,
        suspectedCases: 289,
        deaths: 15,
        severity: "medium",
        transmissionMode: "waterborne",
        lastUpdated: "2025-10-24",
        description: "Drug-resistant strain spreading through contaminated water"
    },
    // High Severity Outbreaks (20 additional)
    {
        id: 9,
        disease: "Ebola Virus Disease",
        type: "viral",
        country: "Guinea",
        region: "West Africa",
        city: "Conakry",
        lat: 9.5370,
        lng: -13.6785,
        confirmedCases: 89,
        suspectedCases: 45,
        deaths: 52,
        severity: "high",
        transmissionMode: "contact",
        lastUpdated: "2025-10-27",
        description: "Hemorrhagic fever outbreak with rapid transmission"
    },
    {
        id: 10,
        disease: "MERS-CoV",
        type: "viral",
        country: "Saudi Arabia",
        region: "Middle East",
        city: "Riyadh",
        lat: 24.7136,
        lng: 46.6753,
        confirmedCases: 167,
        suspectedCases: 89,
        deaths: 45,
        severity: "high",
        transmissionMode: "airborne",
        lastUpdated: "2025-10-26",
        description: "Middle East Respiratory Syndrome spreading in healthcare facilities"
    },
    {
        id: 11,
        disease: "Lassa Fever",
        type: "viral",
        country: "Sierra Leone",
        region: "West Africa",
        city: "Freetown",
        lat: 8.4657,
        lng: -13.2317,
        confirmedCases: 234,
        suspectedCases: 156,
        deaths: 78,
        severity: "high",
        transmissionMode: "contact",
        lastUpdated: "2025-10-25",
        description: "Viral hemorrhagic fever with high mortality rate"
    },
    {
        id: 12,
        disease: "Meningococcal Disease",
        type: "bacterial",
        country: "Niger",
        region: "West Africa",
        city: "Niamey",
        lat: 13.5116,
        lng: 2.1254,
        confirmedCases: 445,
        suspectedCases: 234,
        deaths: 89,
        severity: "high",
        transmissionMode: "airborne",
        lastUpdated: "2025-10-27",
        description: "Bacterial meningitis outbreak during dry season"
    },
    {
        id: 13,
        disease: "Plague",
        type: "bacterial",
        country: "Madagascar",
        region: "East Africa",
        city: "Antananarivo",
        lat: -18.8792,
        lng: 47.5079,
        confirmedCases: 123,
        suspectedCases: 67,
        deaths: 34,
        severity: "high",
        transmissionMode: "vector-borne",
        lastUpdated: "2025-10-26",
        description: "Pneumonic plague with person-to-person transmission"
    },
    {
        id: 14,
        disease: "Rift Valley Fever",
        type: "viral",
        country: "Kenya",
        region: "East Africa",
        city: "Nairobi",
        lat: -1.2921,
        lng: 36.8219,
        confirmedCases: 289,
        suspectedCases: 145,
        deaths: 67,
        severity: "high",
        transmissionMode: "vector-borne",
        lastUpdated: "2025-10-25",
        description: "Zoonotic outbreak affecting livestock and humans"
    },
    {
        id: 15,
        disease: "Crimean-Congo Hemorrhagic Fever",
        type: "viral",
        country: "Turkey",
        region: "Europe/Asia",
        city: "Ankara",
        lat: 39.9334,
        lng: 32.8597,
        confirmedCases: 156,
        suspectedCases: 78,
        deaths: 43,
        severity: "high",
        transmissionMode: "vector-borne",
        lastUpdated: "2025-10-27",
        description: "Tick-borne hemorrhagic fever with high case fatality"
    },
    {
        id: 16,
        disease: "Hantavirus Pulmonary Syndrome",
        type: "viral",
        country: "Chile",
        region: "South America",
        city: "Santiago",
        lat: -33.4489,
        lng: -70.6693,
        confirmedCases: 89,
        suspectedCases: 45,
        deaths: 34,
        severity: "high",
        transmissionMode: "airborne",
        lastUpdated: "2025-10-26",
        description: "Rodent-borne viral infection with respiratory failure"
    },
    {
        id: 17,
        disease: "Anthrax",
        type: "bacterial",
        country: "Bangladesh",
        region: "South Asia",
        city: "Dhaka",
        lat: 23.8103,
        lng: 90.4125,
        confirmedCases: 234,
        suspectedCases: 123,
        deaths: 45,
        severity: "high",
        transmissionMode: "contact",
        lastUpdated: "2025-10-25",
        description: "Cutaneous and pulmonary anthrax from infected livestock"
    },
    {
        id: 18,
        disease: "Nipah Virus",
        type: "viral",
        country: "Malaysia",
        region: "Southeast Asia",
        city: "Kuala Lumpur",
        lat: 3.1390,
        lng: 101.6869,
        confirmedCases: 67,
        suspectedCases: 34,
        deaths: 28,
        severity: "high",
        transmissionMode: "contact",
        lastUpdated: "2025-10-27",
        description: "Zoonotic encephalitis with high mortality"
    },
    {
        id: 19,
        disease: "Glanders",
        type: "bacterial",
        country: "Iran",
        region: "Middle East",
        city: "Tehran",
        lat: 35.6892,
        lng: 51.3890,
        confirmedCases: 45,
        suspectedCases: 23,
        deaths: 18,
        severity: "high",
        transmissionMode: "contact",
        lastUpdated: "2025-10-26",
        description: "Rare bacterial infection from horses and mules"
    },
    {
        id: 20,
        disease: "Tularemia",
        type: "bacterial",
        country: "Russia",
        region: "Europe/Asia",
        city: "Moscow",
        lat: 55.7558,
        lng: 37.6176,
        confirmedCases: 178,
        suspectedCases: 89,
        deaths: 23,
        severity: "high",
        transmissionMode: "vector-borne",
        lastUpdated: "2025-10-25",
        description: "Rabbit fever with multiple transmission routes"
    },
    {
        id: 21,
        disease: "Kyasanur Forest Disease",
        type: "viral",
        country: "India",
        region: "South Asia",
        city: "Bangalore",
        lat: 12.9716,
        lng: 77.5946,
        confirmedCases: 123,
        suspectedCases: 67,
        deaths: 34,
        severity: "high",
        transmissionMode: "vector-borne",
        lastUpdated: "2025-10-27",
        description: "Tick-borne hemorrhagic fever in forest workers"
    },
    {
        id: 22,
        disease: "Venezuelan Equine Encephalitis",
        type: "viral",
        country: "Venezuela",
        region: "South America",
        city: "Caracas",
        lat: 10.4806,
        lng: -66.9036,
        confirmedCases: 89,
        suspectedCases: 45,
        deaths: 23,
        severity: "high",
        transmissionMode: "vector-borne",
        lastUpdated: "2025-10-26",
        description: "Mosquito-borne encephalitis affecting horses and humans"
    },
    {
        id: 23,
        disease: "Omsk Hemorrhagic Fever",
        type: "viral",
        country: "Russia",
        region: "Europe/Asia",
        city: "Omsk",
        lat: 54.9885,
        lng: 73.3242,
        confirmedCases: 67,
        suspectedCases: 34,
        deaths: 18,
        severity: "high",
        transmissionMode: "vector-borne",
        lastUpdated: "2025-10-25",
        description: "Tick-borne hemorrhagic fever in Siberia"
    },
    {
        id: 24,
        disease: "Alkhurma Hemorrhagic Fever",
        type: "viral",
        country: "Saudi Arabia",
        region: "Middle East",
        city: "Jeddah",
        lat: 21.4858,
        lng: 39.1925,
        confirmedCases: 45,
        suspectedCases: 23,
        deaths: 15,
        severity: "high",
        transmissionMode: "vector-borne",
        lastUpdated: "2025-10-27",
        description: "Tick-borne viral hemorrhagic fever"
    },
    {
        id: 25,
        disease: "Powassan Virus",
        type: "viral",
        country: "Canada",
        region: "North America",
        city: "Toronto",
        lat: 43.6532,
        lng: -79.3832,
        confirmedCases: 34,
        suspectedCases: 18,
        deaths: 12,
        severity: "high",
        transmissionMode: "vector-borne",
        lastUpdated: "2025-10-26",
        description: "Tick-borne encephalitis with neurological complications"
    },
    {
        id: 26,
        disease: "Lujo Virus",
        type: "viral",
        country: "South Africa",
        region: "Southern Africa",
        city: "Johannesburg",
        lat: -26.2041,
        lng: 28.0473,
        confirmedCases: 23,
        suspectedCases: 12,
        deaths: 18,
        severity: "high",
        transmissionMode: "contact",
        lastUpdated: "2025-10-25",
        description: "Arenavirus causing hemorrhagic fever"
    },
    {
        id: 27,
        disease: "Chapare Hemorrhagic Fever",
        type: "viral",
        country: "Bolivia",
        region: "South America",
        city: "La Paz",
        lat: -16.4897,
        lng: -68.1193,
        confirmedCases: 18,
        suspectedCases: 9,
        deaths: 12,
        severity: "high",
        transmissionMode: "contact",
        lastUpdated: "2025-10-27",
        description: "Rodent-borne hemorrhagic fever with high mortality"
    },
    {
        id: 28,
        disease: "Machupo Virus",
        type: "viral",
        country: "Bolivia",
        region: "South America",
        city: "Santa Cruz",
        lat: -17.7834,
        lng: -63.1821,
        confirmedCases: 34,
        suspectedCases: 18,
        deaths: 15,
        severity: "high",
        transmissionMode: "contact",
        lastUpdated: "2025-10-26",
        description: "Bolivian hemorrhagic fever from rodent exposure"
    },
    // Medium Severity Outbreaks (10 additional)
    {
        id: 29,
        disease: "Chikungunya",
        type: "viral",
        country: "Thailand",
        region: "Southeast Asia",
        city: "Bangkok",
        lat: 13.7563,
        lng: 100.5018,
        confirmedCases: 1456,
        suspectedCases: 789,
        deaths: 8,
        severity: "medium",
        transmissionMode: "vector-borne",
        lastUpdated: "2025-10-27",
        description: "Mosquito-borne viral infection causing joint pain"
    },
    {
        id: 30,
        disease: "Zika Virus",
        type: "viral",
        country: "Mexico",
        region: "North America",
        city: "Mexico City",
        lat: 19.4326,
        lng: -99.1332,
        confirmedCases: 867,
        suspectedCases: 445,
        deaths: 5,
        severity: "medium",
        transmissionMode: "vector-borne",
        lastUpdated: "2025-10-26",
        description: "Mosquito-borne virus affecting pregnant women"
    },
    {
        id: 31,
        disease: "Leishmaniasis",
        type: "parasitic",
        country: "Afghanistan",
        region: "South Asia",
        city: "Kabul",
        lat: 34.5553,
        lng: 69.2075,
        confirmedCases: 723,
        suspectedCases: 389,
        deaths: 12,
        severity: "medium",
        transmissionMode: "vector-borne",
        lastUpdated: "2025-10-25",
        description: "Sandfly-transmitted parasitic infection"
    },
    {
        id: 32,
        disease: "West Nile Virus",
        type: "viral",
        country: "United States",
        region: "North America",
        city: "Houston",
        lat: 29.7604,
        lng: -95.3698,
        confirmedCases: 234,
        suspectedCases: 123,
        deaths: 15,
        severity: "medium",
        transmissionMode: "vector-borne",
        lastUpdated: "2025-10-27",
        description: "Mosquito-borne neuroinvasive disease"
    },
    {
        id: 33,
        disease: "Japanese Encephalitis",
        type: "viral",
        country: "Cambodia",
        region: "Southeast Asia",
        city: "Phnom Penh",
        lat: 11.5564,
        lng: 104.9282,
        confirmedCases: 189,
        suspectedCases: 95,
        deaths: 18,
        severity: "medium",
        transmissionMode: "vector-borne",
        lastUpdated: "2025-10-26",
        description: "Mosquito-borne encephalitis in rural areas"
    },
    {
        id: 34,
        disease: "Q Fever",
        type: "bacterial",
        country: "Australia",
        region: "Oceania",
        city: "Brisbane",
        lat: -27.4705,
        lng: 153.0260,
        confirmedCases: 145,
        suspectedCases: 78,
        deaths: 6,
        severity: "medium",
        transmissionMode: "airborne",
        lastUpdated: "2025-10-25",
        description: "Coxiella burnetii infection from livestock"
    },
    {
        id: 35,
        disease: "Scrub Typhus",
        type: "bacterial",
        country: "South Korea",
        region: "East Asia",
        city: "Seoul",
        lat: 37.5665,
        lng: 126.9780,
        confirmedCases: 567,
        suspectedCases: 289,
        deaths: 9,
        severity: "medium",
        transmissionMode: "vector-borne",
        lastUpdated: "2025-10-27",
        description: "Mite-borne rickettsia infection"
    },
    {
        id: 36,
        disease: "Leptospirosis",
        type: "bacterial",
        country: "Philippines",
        region: "Southeast Asia",
        city: "Manila",
        lat: 14.5995,
        lng: 120.9842,
        confirmedCases: 445,
        suspectedCases: 234,
        deaths: 23,
        severity: "medium",
        transmissionMode: "waterborne",
        lastUpdated: "2025-10-26",
        description: "Bacterial infection from contaminated water and soil"
    },
    {
        id: 37,
        disease: "Brucellosis",
        type: "bacterial",
        country: "Mongolia",
        region: "East Asia",
        city: "Ulaanbaatar",
        lat: 47.8864,
        lng: 106.9057,
        confirmedCases: 234,
        suspectedCases: 123,
        deaths: 4,
        severity: "medium",
        transmissionMode: "contact",
        lastUpdated: "2025-10-25",
        description: "Zoonotic bacterial infection from livestock"
    },
    {
        id: 38,
        disease: "Murine Typhus",
        type: "bacterial",
        country: "Greece",
        region: "Europe",
        city: "Athens",
        lat: 37.9838,
        lng: 23.7275,
        confirmedCases: 123,
        suspectedCases: 67,
        deaths: 3,
        severity: "medium",
        transmissionMode: "vector-borne",
        lastUpdated: "2025-10-27",
        description: "Flea-borne typhus in urban areas"
    },
    // Low Severity Outbreaks (20 additional)
    {
        id: 39,
        disease: "Norovirus",
        type: "viral",
        country: "Norway",
        region: "Europe",
        city: "Oslo",
        lat: 59.9139,
        lng: 10.7522,
        confirmedCases: 1234,
        suspectedCases: 678,
        deaths: 2,
        severity: "low",
        transmissionMode: "contact",
        lastUpdated: "2025-10-27",
        description: "Gastroenteritis outbreak in cruise ship passengers"
    },
    {
        id: 40,
        disease: "Rotavirus",
        type: "viral",
        country: "Ghana",
        region: "West Africa",
        city: "Accra",
        lat: 5.6037,
        lng: -0.1870,
        confirmedCases: 876,
        suspectedCases: 445,
        deaths: 1,
        severity: "low",
        transmissionMode: "contact",
        lastUpdated: "2025-10-26",
        description: "Childhood diarrheal disease in daycare centers"
    },
    {
        id: 41,
        disease: "Hand, Foot, and Mouth Disease",
        type: "viral",
        country: "Singapore",
        region: "Southeast Asia",
        city: "Singapore",
        lat: 1.3521,
        lng: 103.8198,
        confirmedCases: 567,
        suspectedCases: 289,
        deaths: 0,
        severity: "low",
        transmissionMode: "contact",
        lastUpdated: "2025-10-25",
        description: "Enterovirus infection in preschool children"
    },
    {
        id: 42,
        disease: "Fifth Disease",
        type: "viral",
        country: "Germany",
        region: "Europe",
        city: "Berlin",
        lat: 52.5200,
        lng: 13.4050,
        confirmedCases: 345,
        suspectedCases: 178,
        deaths: 0,
        severity: "low",
        transmissionMode: "airborne",
        lastUpdated: "2025-10-27",
        description: "Parvovirus B19 causing slapped cheek syndrome"
    },
    {
        id: 43,
        disease: "Molluscum Contagiosum",
        type: "viral",
        country: "United Kingdom",
        region: "Europe",
        city: "London",
        lat: 51.5074,
        lng: -0.1278,
        confirmedCases: 234,
        suspectedCases: 123,
        deaths: 0,
        severity: "low",
        transmissionMode: "contact",
        lastUpdated: "2025-10-26",
        description: "Benign skin infection in children and immunocompromised"
    },
    {
        id: 44,
        disease: "Roseola",
        type: "viral",
        country: "Japan",
        region: "East Asia",
        city: "Tokyo",
        lat: 35.6762,
        lng: 139.6503,
        confirmedCases: 456,
        suspectedCases: 234,
        deaths: 0,
        severity: "low",
        transmissionMode: "airborne",
        lastUpdated: "2025-10-25",
        description: "Human herpesvirus causing fever and rash in infants"
    },
    {
        id: 45,
        disease: "Conjunctivitis",
        type: "viral",
        country: "Egypt",
        region: "Middle East/Africa",
        city: "Cairo",
        lat: 30.0444,
        lng: 31.2357,
        confirmedCases: 789,
        suspectedCases: 389,
        deaths: 0,
        severity: "low",
        transmissionMode: "contact",
        lastUpdated: "2025-10-27",
        description: "Viral pink eye outbreak in schools"
    },
    {
        id: 46,
        disease: "Common Cold",
        type: "viral",
        country: "Canada",
        region: "North America",
        city: "Vancouver",
        lat: 49.2827,
        lng: -123.1207,
        confirmedCases: 2345,
        suspectedCases: 1234,
        deaths: 0,
        severity: "low",
        transmissionMode: "airborne",
        lastUpdated: "2025-10-26",
        description: "Rhinovirus outbreak in office buildings"
    },
    {
        id: 47,
        disease: "Impetigo",
        type: "bacterial",
        country: "New Zealand",
        region: "Oceania",
        city: "Auckland",
        lat: -36.8485,
        lng: 174.7633,
        confirmedCases: 123,
        suspectedCases: 67,
        deaths: 0,
        severity: "low",
        transmissionMode: "contact",
        lastUpdated: "2025-10-25",
        description: "Superficial skin infection in children"
    },
    {
        id: 48,
        disease: "Cellulitis",
        type: "bacterial",
        country: "France",
        region: "Europe",
        city: "Paris",
        lat: 48.8566,
        lng: 2.3522,
        confirmedCases: 234,
        suspectedCases: 123,
        deaths: 1,
        severity: "low",
        transmissionMode: "contact",
        lastUpdated: "2025-10-27",
        description: "Bacterial skin and soft tissue infection"
    },
    {
        id: 49,
        disease: "Swimmer's Ear",
        type: "bacterial",
        country: "Spain",
        region: "Europe",
        city: "Barcelona",
        lat: 41.3851,
        lng: 2.1734,
        confirmedCases: 345,
        suspectedCases: 178,
        deaths: 0,
        severity: "low",
        transmissionMode: "contact",
        lastUpdated: "2025-10-26",
        description: "Otitis externa from contaminated water exposure"
    },
    {
        id: 50,
        disease: "Thrush",
        type: "fungal",
        country: "Italy",
        region: "Europe",
        city: "Rome",
        lat: 41.9028,
        lng: 12.4964,
        confirmedCases: 456,
        suspectedCases: 234,
        deaths: 0,
        severity: "low",
        transmissionMode: "contact",
        lastUpdated: "2025-10-25",
        description: "Candida albicans oral infection in immunocompromised"
    },
    {
        id: 51,
        disease: "Plantar Warts",
        type: "viral",
        country: "Netherlands",
        region: "Europe",
        city: "Amsterdam",
        lat: 52.3676,
        lng: 4.9041,
        confirmedCases: 234,
        suspectedCases: 123,
        deaths: 0,
        severity: "low",
        transmissionMode: "contact",
        lastUpdated: "2025-10-27",
        description: "HPV infection of foot soles in gymnasium users"
    },
    {
        id: 52,
        disease: "Ringworm",
        type: "fungal",
        country: "Brazil",
        region: "South America",
        city: "Rio de Janeiro",
        lat: -22.9068,
        lng: -43.1729,
        confirmedCases: 567,
        suspectedCases: 289,
        deaths: 0,
        severity: "low",
        transmissionMode: "contact",
        lastUpdated: "2025-10-26",
        description: "Dermatophyte fungal infection of skin and scalp"
    },
    {
        id: 53,
        disease: "Scabies",
        type: "parasitic",
        country: "India",
        region: "South Asia",
        city: "New Delhi",
        lat: 28.6139,
        lng: 77.2090,
        confirmedCases: 789,
        suspectedCases: 389,
        deaths: 0,
        severity: "low",
        transmissionMode: "contact",
        lastUpdated: "2025-10-25",
        description: "Mite infestation causing intense itching"
    },
    {
        id: 54,
        disease: "Head Lice",
        type: "parasitic",
        country: "United States",
        region: "North America",
        city: "Chicago",
        lat: 41.8781,
        lng: -87.6298,
        confirmedCases: 456,
        suspectedCases: 234,
        deaths: 0,
        severity: "low",
        transmissionMode: "contact",
        lastUpdated: "2025-10-27",
        description: "Pediculosis capitis outbreak in elementary schools"
    },
    {
        id: 55,
        disease: "Pinworms",
        type: "parasitic",
        country: "Poland",
        region: "Europe",
        city: "Warsaw",
        lat: 52.2297,
        lng: 21.0122,
        confirmedCases: 345,
        suspectedCases: 178,
        deaths: 0,
        severity: "low",
        transmissionMode: "contact",
        lastUpdated: "2025-10-26",
        description: "Enterobius vermicularis intestinal parasite in children"
    },
    {
        id: 56,
        disease: "Urinary Tract Infection",
        type: "bacterial",
        country: "Sweden",
        region: "Europe",
        city: "Stockholm",
        lat: 59.3293,
        lng: 18.0686,
        confirmedCases: 678,
        suspectedCases: 345,
        deaths: 0,
        severity: "low",
        transmissionMode: "contact",
        lastUpdated: "2025-10-25",
        description: "E. coli UTI cluster in nursing home residents"
    },
    {
        id: 57,
        disease: "Food Poisoning",
        type: "bacterial",
        country: "South Korea",
        region: "East Asia",
        city: "Busan",
        lat: 35.1796,
        lng: 129.0756,
        confirmedCases: 234,
        suspectedCases: 123,
        deaths: 0,
        severity: "low",
        transmissionMode: "foodborne",
        lastUpdated: "2025-10-27",
        description: "Salmonella gastroenteritis from contaminated seafood"
    },
    {
        id: 58,
        disease: "Athlete's Foot",
        type: "fungal",
        country: "Portugal",
        region: "Europe",
        city: "Lisbon",
        lat: 38.7223,
        lng: -9.1393,
        confirmedCases: 189,
        suspectedCases: 95,
        deaths: 0,
        severity: "low",
        transmissionMode: "contact",
        lastUpdated: "2025-10-26",
        description: "Tinea pedis fungal infection in sports facilities"
    }
];

// Mock research data
const researchDataset = [
    {
        id: 1,
        title: "Epidemiological Analysis of H5N1 Transmission Patterns",
        type: "quantitative",
        region: "asia",
        country: "Vietnam",
        demographics: "Adults 18-65",
        ageGroup: "19-35",
        sampleSize: 2456,
        status: "published",
        lastUpdated: "2025-10-20",
        description: "Comprehensive study on avian influenza transmission in urban populations"
    },
    {
        id: 2,
        title: "Community Perceptions of Dengue Prevention Measures",
        type: "qualitative",
        region: "south-america",
        country: "Brazil",
        demographics: "Mixed population",
        ageGroup: "all",
        sampleSize: 345,
        status: "ongoing",
        lastUpdated: "2025-10-22",
        description: "Qualitative assessment of behavioral interventions"
    },
    {
        id: 3,
        title: "Cholera Outbreak Response Effectiveness",
        type: "mixed",
        region: "africa",
        country: "Nigeria",
        demographics: "Children & Adults",
        ageGroup: "0-18",
        sampleSize: 1234,
        status: "published",
        lastUpdated: "2025-10-18",
        description: "Mixed-methods evaluation of rapid response protocols"
    },
    {
        id: 4,
        title: "Mpox Vaccine Efficacy in High-Risk Populations",
        type: "quantitative",
        region: "africa",
        country: "Democratic Republic of Congo",
        demographics: "High-risk adults",
        ageGroup: "19-35",
        sampleSize: 876,
        status: "ongoing",
        lastUpdated: "2025-10-25",
        description: "Randomized controlled trial of vaccine effectiveness"
    },
    {
        id: 5,
        title: "Malaria Drug Resistance Monitoring",
        type: "quantitative",
        region: "asia",
        country: "India",
        demographics: "All ages",
        ageGroup: "all",
        sampleSize: 3456,
        status: "published",
        lastUpdated: "2025-10-15",
        description: "Surveillance study of antimalarial drug resistance patterns"
    },
    {
        id: 6,
        title: "Healthcare Worker Safety During Viral Hemorrhagic Fever Outbreaks",
        type: "qualitative",
        region: "africa",
        country: "Uganda",
        demographics: "Healthcare workers",
        ageGroup: "19-35",
        sampleSize: 156,
        status: "draft",
        lastUpdated: "2025-10-21",
        description: "Interviews on PPE effectiveness and safety protocols"
    },
    {
        id: 7,
        title: "Yellow Fever Vaccination Coverage Assessment",
        type: "quantitative",
        region: "south-america",
        country: "Colombia",
        demographics: "General population",
        ageGroup: "all",
        sampleSize: 5678,
        status: "published",
        lastUpdated: "2025-10-12",
        description: "Population-based survey of vaccination rates and coverage gaps"
    },
    {
        id: 8,
        title: "Antibiotic Resistance in Typhoid Fever Cases",
        type: "quantitative",
        region: "asia",
        country: "Pakistan",
        demographics: "Pediatric & Adult",
        ageGroup: "all",
        sampleSize: 987,
        status: "ongoing",
        lastUpdated: "2025-10-23",
        description: "Laboratory analysis of antimicrobial susceptibility patterns"
    }
];

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeMap();
    initializeDashboard();
    initializeDataRepository();
    initializeSubmissionForm();
    updateDashboardStats();
    populateRecentAlerts();
});

// Navigation functionality
function initializeNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.content-section');
    
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSection = button.getAttribute('data-section');
            
            // Update active nav button
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update active section
            sections.forEach(section => section.classList.remove('active'));
            document.getElementById(targetSection).classList.add('active');
            
            // Refresh map if switching to outbreak-map section
            if (targetSection === 'outbreak-map' && map) {
                setTimeout(() => map.invalidateSize(), 100);
            }
        });
    });
}

// Map initialization and functionality
function initializeMap() {
    // Initialize the map
    map = L.map('map').setView([20, 0], 2);
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Add outbreak markers
    addOutbreakMarkers();
    
    // Initialize map filters
    document.getElementById('disease-filter').addEventListener('change', filterOutbreakMarkers);
    document.getElementById('severity-filter').addEventListener('change', filterOutbreakMarkers);
}

function addOutbreakMarkers() {
    // Clear existing markers
    outbreakMarkers.forEach(marker => map.removeLayer(marker));
    outbreakMarkers = [];
    
    outbreakData.forEach(outbreak => {
        const markerColor = getSeverityColor(outbreak.severity);
        const markerIcon = L.divIcon({
            className: 'outbreak-marker',
            html: `<div style="background-color: ${markerColor}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>`,
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });
        
        const marker = L.marker([outbreak.lat, outbreak.lng], { icon: markerIcon });
        
        const popupContent = createOutbreakPopup(outbreak);
        marker.bindPopup(popupContent);
        
        marker.addTo(map);
        outbreakMarkers.push(marker);
    });
}

function getSeverityColor(severity) {
    switch(severity) {
        case 'high': return '#e74c3c';
        case 'medium': return '#f39c12';
        case 'low': return '#27ae60';
        default: return '#95a5a6';
    }
}

function createOutbreakPopup(outbreak) {
    return `
        <div class="outbreak-popup">
            <h4>${outbreak.disease}</h4>
            <div class="severity ${outbreak.severity}">${outbreak.severity.toUpperCase()}</div>
            <p><strong>Location:</strong> ${outbreak.city}, ${outbreak.country}</p>
            <p><strong>Confirmed Cases:</strong> ${outbreak.confirmedCases.toLocaleString()}</p>
            <p><strong>Suspected Cases:</strong> ${outbreak.suspectedCases.toLocaleString()}</p>
            <p><strong>Deaths:</strong> ${outbreak.deaths}</p>
            <p><strong>Type:</strong> ${outbreak.type}</p>
            <p><strong>Transmission:</strong> ${outbreak.transmissionMode}</p>
            <p><strong>Last Updated:</strong> ${formatDate(outbreak.lastUpdated)}</p>
            <p><strong>Details:</strong> ${outbreak.description}</p>
        </div>
    `;
}

function filterOutbreakMarkers() {
    const diseaseFilter = document.getElementById('disease-filter').value;
    const severityFilter = document.getElementById('severity-filter').value;
    
    outbreakMarkers.forEach((marker, index) => {
        const outbreak = outbreakData[index];
        let showMarker = true;
        
        if (diseaseFilter !== 'all' && outbreak.type !== diseaseFilter) {
            showMarker = false;
        }
        
        if (severityFilter !== 'all' && outbreak.severity !== severityFilter) {
            showMarker = false;
        }
        
        if (showMarker) {
            marker.addTo(map);
        } else {
            map.removeLayer(marker);
        }
    });
}

// Dashboard functionality
function initializeDashboard() {
    createOutbreakTrendsChart();
    createDiseaseDistributionChart();
}

function updateDashboardStats() {
    const totalOutbreaks = outbreakData.length;
    const countries = [...new Set(outbreakData.map(o => o.country))].length;
    const totalCases = outbreakData.reduce((sum, o) => sum + o.confirmedCases + o.suspectedCases, 0);
    const researchStudies = researchDataset.length;
    
    document.getElementById('active-outbreaks').textContent = totalOutbreaks;
    document.getElementById('countries-affected').textContent = countries;
    document.getElementById('total-cases').textContent = totalCases.toLocaleString();
    document.getElementById('research-studies').textContent = researchStudies;
}

function createOutbreakTrendsChart() {
    const ctx = document.getElementById('outbreak-trends-chart').getContext('2d');
    
    // Generate mock trend data for the last 30 days
    const dates = [];
    const outbreakCounts = [];
    
    for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        outbreakCounts.push(Math.floor(Math.random() * 5) + 15); // Random values between 15-20
    }
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Active Outbreaks',
                data: outbreakCounts,
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#f1f3f4'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function createDiseaseDistributionChart() {
    const ctx = document.getElementById('disease-distribution-chart').getContext('2d');
    
    // Calculate disease type distribution
    const diseaseTypes = {};
    outbreakData.forEach(outbreak => {
        diseaseTypes[outbreak.type] = (diseaseTypes[outbreak.type] || 0) + 1;
    });
    
    const labels = Object.keys(diseaseTypes).map(type => 
        type.charAt(0).toUpperCase() + type.slice(1)
    );
    const data = Object.values(diseaseTypes);
    const colors = ['#e74c3c', '#3498db', '#f39c12', '#27ae60', '#9b59b6'];
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors.slice(0, labels.length),
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
    });
}

function populateRecentAlerts() {
    const alertsContainer = document.getElementById('recent-alerts');
    const recentOutbreaks = outbreakData
        .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
        .slice(0, 5);
    
    alertsContainer.innerHTML = recentOutbreaks.map(outbreak => `
        <div class="alert-item ${outbreak.severity}">
            <div class="alert-time">${formatDate(outbreak.lastUpdated)}</div>
            <div class="alert-location">${outbreak.city}, ${outbreak.country}</div>
            <div class="alert-disease">${outbreak.disease}</div>
            <div>${outbreak.confirmedCases} confirmed cases</div>
        </div>
    `).join('');
}

// Data Repository functionality
function initializeDataRepository() {
    researchData = [...researchDataset];
    filteredResearchData = [...researchData];
    
    populateResearchTable();
    
    // Initialize filters
    document.getElementById('data-type-filter').addEventListener('change', applyDataFilters);
    document.getElementById('region-filter').addEventListener('change', applyDataFilters);
    document.getElementById('age-filter').addEventListener('change', applyDataFilters);
    document.getElementById('search-input').addEventListener('input', applyDataFilters);
}

function populateResearchTable() {
    const tableBody = document.getElementById('research-table-body');
    
    tableBody.innerHTML = filteredResearchData.map(study => `
        <tr>
            <td>${study.title}</td>
            <td>${study.type.charAt(0).toUpperCase() + study.type.slice(1)}</td>
            <td>${study.country}</td>
            <td>${study.demographics}</td>
            <td>${study.sampleSize.toLocaleString()}</td>
            <td><span class="status-badge status-${study.status}">${study.status}</span></td>
            <td>${formatDate(study.lastUpdated)}</td>
            <td>
                <button class="action-btn" onclick="viewStudy(${study.id})">View</button>
                <button class="action-btn" onclick="downloadData(${study.id})">Download</button>
            </td>
        </tr>
    `).join('');
}

function applyDataFilters() {
    const dataType = document.getElementById('data-type-filter').value;
    const region = document.getElementById('region-filter').value;
    const ageGroup = document.getElementById('age-filter').value;
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    
    filteredResearchData = researchData.filter(study => {
        let matches = true;
        
        if (dataType !== 'all' && study.type !== dataType) {
            matches = false;
        }
        
        if (region !== 'all' && study.region !== region) {
            matches = false;
        }
        
        if (ageGroup !== 'all' && study.ageGroup !== ageGroup) {
            matches = false;
        }
        
        if (searchTerm && !study.title.toLowerCase().includes(searchTerm)) {
            matches = false;
        }
        
        return matches;
    });
    
    populateResearchTable();
}

function viewStudy(studyId) {
    const study = researchData.find(s => s.id === studyId);
    alert(`Viewing study: ${study.title}\n\nDescription: ${study.description}\n\nThis would typically open a detailed view or new page.`);
}

function downloadData(studyId) {
    const study = researchData.find(s => s.id === studyId);
    alert(`Downloading data for: ${study.title}\n\nThis would typically trigger a file download.`);
}

// Submission Form functionality
function initializeSubmissionForm() {
    const form = document.getElementById('outbreak-submission-form');
    
    form.addEventListener('submit', handleFormSubmission);
    form.addEventListener('reset', handleFormReset);
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const outbreakReport = {
        id: outbreakData.length + 1,
        researcherName: formData.get('researcher-name') || document.getElementById('researcher-name').value,
        institution: formData.get('institution') || document.getElementById('institution').value,
        disease: formData.get('disease-name') || document.getElementById('disease-name').value,
        type: formData.get('disease-type') || document.getElementById('disease-type').value,
        country: formData.get('location-country') || document.getElementById('location-country').value,
        region: formData.get('location-region') || document.getElementById('location-region').value,
        city: formData.get('location-city') || document.getElementById('location-city').value,
        confirmedCases: parseInt(formData.get('cases-confirmed') || document.getElementById('cases-confirmed').value) || 0,
        suspectedCases: parseInt(formData.get('cases-suspected') || document.getElementById('cases-suspected').value) || 0,
        deaths: parseInt(formData.get('deaths') || document.getElementById('deaths').value) || 0,
        severity: formData.get('severity-level') || document.getElementById('severity-level').value,
        transmissionMode: formData.get('transmission-mode') || document.getElementById('transmission-mode').value,
        description: formData.get('description') || document.getElementById('description').value,
        lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    // Simulate form submission
    showSubmissionStatus('Submitting outbreak report...', 'info');
    
    setTimeout(() => {
        // Add to mock data (in a real application, this would send to a server)
        outbreakData.push(outbreakReport);
        
        showSubmissionStatus('Outbreak report submitted successfully!', 'success');
        
        // Reset form
        e.target.reset();
        
        // Update dashboard stats
        updateDashboardStats();
        populateRecentAlerts();
        
        // If on map view, refresh markers
        if (map) {
            addOutbreakMarkers();
        }
    }, 2000);
}

function handleFormReset() {
    showSubmissionStatus('Form has been reset.', 'info');
}

function showSubmissionStatus(message, type) {
    // Remove existing status messages
    const existingStatus = document.querySelector('.submission-status');
    if (existingStatus) {
        existingStatus.remove();
    }
    
    // Create new status message
    const statusDiv = document.createElement('div');
    statusDiv.className = `submission-status ${type}`;
    statusDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        ${message}
    `;
    
    // Add styles for status message
    statusDiv.style.cssText = `
        padding: 12px 20px;
        border-radius: 6px;
        margin: 20px 0;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
        font-size: 14px;
        ${type === 'success' ? 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;' : 
          type === 'error' ? 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;' : 
          'background: #d1ecf1; color: #0c5460; border: 1px solid #bee5eb;'}
    `;
    
    // Insert status message before form actions
    const formActions = document.querySelector('.form-actions');
    formActions.parentNode.insertBefore(statusDiv, formActions);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (statusDiv.parentNode) {
            statusDiv.remove();
        }
    }, 5000);
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Additional dynamic features
setInterval(() => {
    // Simulate real-time updates every 30 seconds
    updateDashboardStats();
    
    // Randomly update some outbreak data to simulate real-time changes
    if (Math.random() < 0.1) { // 10% chance every 30 seconds
        const randomOutbreak = outbreakData[Math.floor(Math.random() * outbreakData.length)];
        randomOutbreak.confirmedCases += Math.floor(Math.random() * 5);
        randomOutbreak.suspectedCases += Math.floor(Math.random() * 3);
        randomOutbreak.lastUpdated = new Date().toISOString().split('T')[0];
        
        // Update map popup if it's open
        if (map) {
            outbreakMarkers.forEach((marker, index) => {
                if (outbreakData[index].id === randomOutbreak.id) {
                    marker.setPopupContent(createOutbreakPopup(randomOutbreak));
                }
            });
        }
        
        // Update recent alerts
        populateRecentAlerts();
    }
}, 30000);

// Export functions for global access
window.viewStudy = viewStudy;
window.downloadData = downloadData;