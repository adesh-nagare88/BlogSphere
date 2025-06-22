require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('./models/Post');

const posts = [
  {
    "title": "The Rise of Electric Vehicles in India",
    "content": "India's electric vehicle (EV) sector is experiencing rapid growth, propelled by supportive government policies, substantial investments, and rising consumer demand. According to Bloomberg NEF's EV Outlook 2024, EV sales in India are projected to reach 5.9 million units by 2040, with a staggering 199% growth expected by 2027. The acceleration is attributed to an expanding variety of EV models and the increasing popularity of environmentally sustainable transportation among consumers. This marks a significant milestone in India's journey toward a greener and more sustainable automotive future.",
    "category": "Technical",
    "image": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "author": "680deb0dae7dcca39af20ab0"
  },
  {
    "title": "Advancements in Renewable Energy in India",
    "content": "Haryana has made significant strides in solar energy adoption, particularly in agriculture, by installing over 154,000 solar-powered water pumps, contributing 822 MW out of the state's total 1,300 MW solar energy capacity. This initiative, led by the Haryana Renewable Energy Development Agency (HAREDA), has significantly reduced farmers’ dependency on non-renewable energy and alleviated pressure on the electricity grid. The state and central governments provide subsidies for these installations, offering relief to both farmers—who now enjoy reliable irrigation—and the government, which otherwise subsides power at Rs 7.35/unit with farmers paying only 10 paise/unit, incurring a subsidy cost of about Rs 6,781 crore.",
    "category": "Technical",
    "image": "https://images.unsplash.com/photo-1621495995068-18144056a287?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "author": "680deb0dae7dcca39af20ab0"
  },
  {
    "title": "India's Space Program: Achievements and Future Prospects",
    "content": "The Indian Space Research Organisation (ISRO) has made significant strides in space exploration, including successful missions to Mars and the Moon. With a focus on cost-effective and efficient technologies, ISRO has positioned India as a key player in the global space community. Future prospects include ambitious plans for interplanetary missions, satellite launches, and collaborations with international space agencies, aiming to further India's presence in space exploration and technology development.",
    "category": "Technical",
    "image": "https://images.unsplash.com/photo-1657344956545-8f49e1b1f661?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "author": "680deb0dae7dcca39af20ab0"
  },
  {
    "title": "The Role of Artificial Intelligence in Indian Healthcare",
    "content": "Artificial Intelligence (AI) is transforming healthcare in India by improving diagnostics, enhancing patient care, and making medical treatments more affordable. AIIMS Bhopal is launching an innovative project to incorporate 3D printing technology into kidney surgeries, specifically to enhance the precision and safety of complex stone removal procedures. The Department of Urology, led by Dr. Ketan Mehra, secured a Rs 9 lakh research grant from the Madhya Pradesh Council of Science and Technology (MPCST). This initiative focuses on the use of 3D-printed, patient-specific kidney models and customised puncture guides to aid in performing Percutaneous Nephrolithotomy (PCNL), especially for patients with unique anatomical challenges.",
    "category": "Technical",
    "image": "https://plus.unsplash.com/premium_photo-1698421947098-d68176a8f5b2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWklMjB0ZWNobm9sb2d5JTIwaW4lMjBoZWFsdGhjYXJlfGVufDB8fDB8fHww",
    "author": "680deb0dae7dcca39af20ab0"
  },
  {
    "title": "Smart Cities in India: A Vision for the Future",
    "content": "India's Smart Cities initiative aims to use technology and urban planning to improve infrastructure, public services, and quality of life in cities across the country. By integrating information and communication technologies, these cities focus on sustainable development, efficient resource management, and enhanced citizen engagement. The initiative encompasses various aspects, including smart governance, energy management, transportation, and waste management, striving to create urban spaces that are more livable, inclusive, and environmentally friendly.",
    "category": "Technical",
    "image": "https://media.istockphoto.com/id/915681526/photo/bandra-worli-sea-link-mumbai.jpg?s=2048x2048&w=is&k=20&c=COtSrx9PiA785aNsQ2rPaW8ooHNuTkCWkpK8G5ty0YY=",
    "author": "680deb0dae7dcca39af20ab0"
  },
  {
    "title": "The Growing Importance of Cybersecurity in India",
    "content": "With India being one of the largest internet user bases globally, cybersecurity has become a critical focus to protect data, privacy, and prevent cyberattacks. During Operation Sindoor, while India faced physical threats on its western border, it also endured significant cyberattacks from state-backed hackers and hacktivists from Pakistan, Turkey, Bangladesh, Malaysia, and Indonesia, with alleged support from China. Key Indian infrastructure, including defense PSUs, railways, airports, BSNL, UPI, stock exchanges, and major conglomerates, were targeted to extract sensitive defense information and cause disruption.",
    "category": "Technical",
    "image": "https://unsplash.com/photos/a-group-of-windmills-in-a-field-at-sunset-8wiaDG6sqLU",
    "author": "680deb0dae7dcca39af20ab0"
  },
  {
    "title": "Exploring the Spices of India",
    "content": "Indian cuisine is renowned for its vibrant flavors, many of which come from a diverse array of spices. Cardamom, a versatile and aromatic spice originating from southern India, comes mainly in two varieties: green and black. Green cardamom is noted for its fresh, citrusy flavor, making it ideal for sweet dishes like desserts, cakes, and rice puddings. Black cardamom, in contrast, is smoky and robust, best suited for savory dishes such as curries, lamb pilafs, and spice blends like garam masala.",
    "category": "Food",
    "image": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "author": "680deb0dae7dcca39af20ab0"
  },
  {
    "title": "The Art of Making Perfect Biryani",
    "content": "Biryani is a beloved dish in India, with countless regional variations. From Hyderabadi to Lucknowi, the secret to the perfect biryani lies in the quality of ingredients and the method of cooking. The dish typically involves layering marinated meat with fragrant basmati rice, infused with spices like saffron, cardamom, and cloves. Slow cooking allows the flavors to meld, resulting in a rich and aromatic meal that reflects the culinary diversity of India.",
    "category": "Food",
    "image": "https://images.unsplash.com/photo-1701579231305-d84d8af9a3fd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "author": "680deb0dae7dcca39af20ab0"
  },
  {
    "title": "Street Food in India: A Culinary Journey",
    "content": "From chaats to vada pav, India's street food is diverse and delicious. It reflects the cultural variety of the country and offers a quick, flavorful snack for every occasion. Street vendors across cities serve an array of dishes that are not only affordable but also rich in taste and tradition, making street food an integral part of India's culinary landscape.",
    "category": "Food",
    "image": "https://media.istockphoto.com/id/1248675157/photo/chaat.jpg?s=612x612&w=0&k=20&c=at3cwDdgoHh9PZgwbj9tITwN6dp-v0LE93PSKAZGK2I=",
    "author": "680deb0dae7dcca39af20ab0"
  },
  {
    "title": "Indian Sweets: A Sweet Tooth's Paradise",
    "content": "India is known for its wide variety of sweets. From the creamy richness of gulab jamun to the flaky sweetness of jalebi, Indian desserts are a delight for anyone with a sweet tooth. These confections are often made with ingredients like milk, sugar, and ghee, and are flavored with cardamom, saffron, and other spices, offering a delectable end to any meal.",
    "category": "Food",
    "image": "https://media.istockphoto.com/id/1054227530/photo/diwali-rangoli-made-using-diya-oil-lamp-flowers-and-plate-full-of-gulab-jamun-rasgulla-kaju.jpg?s=2048x2048&w=is&k=20&c=9W2QGI7qgyNTA725JetuEA_6B1poeQNhHMGZflIZB2Q=",
    "author": "680deb0dae7dcca39af20ab0"
  },
  {
    "title": "Chai: The Heart of Indian Culture",
    "content": "Chai, or tea, is not just a drink in India — it's a cultural phenomenon. Chaiwala stalls are ubiquitous across cities, serving a sweet and spicy tea that brings people together. Made with black tea, milk, sugar, and a blend of spices like ginger and cardamom, chai is enjoyed by people from all walks of life, symbolizing warmth and hospitality.",
    "category": "Food",
    "image": "https://media.istockphoto.com/id/1217105017/photo/hand-pouring-masala-tea-from-a-teapot-into-a-glass.jpg?s=612x612&w=0&k=20&c=c0WNBJdf8z57_MvzUKZsnlDjGajGchMy8PWaXVDIMR8=",
    "author": "680deb0dae7dcca39af20ab0"
  },
  {
    "title": "The Taste of South India: Dosas and Idlis",
    "content": "The southern states of India are famous for their rice-based dishes like dosas, idlis, and vadas. These dishes are light, healthy, and perfect for breakfast or a quick snack. Often served with coconut chutney and sambar, they showcase the simplicity and flavor of South Indian cuisine, making them favorites across the country.",
    "category": "Food",
    "image": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "author": "680deb0dae7dcca39af20ab0"
  },
  {
    "title": "Exploring the Beauty of Kerala's Backwaters",
    "content": "Kerala’s backwaters are a mesmerizing network of lakes, canals, and rivers, stretching along the Malabar coast. Cruising on a traditional houseboat, known as a kettuvallam, offers a peaceful escape into nature. As you glide through the calm waters, you'll pass by lush paddy fields, swaying coconut palms, and vibrant village life. This serene journey allows travelers to experience Kerala’s unique ecosystem and traditional lifestyle up close. Popular spots include Alleppey, Kumarakom, and Kollam. The gentle rhythm of the water and the picturesque landscape make Kerala’s backwaters an unforgettable travel experience, ideal for both relaxation and cultural immersion.",
    "category": "Travel",
    "image": "https://plus.unsplash.com/premium_photo-1697729438401-fcb4ff66d9a8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8S2VyYWxhJ3MlMjBCYWNrd2F0ZXJzfGVufDB8fDB8fHww",
    "author": "680deb0dae7dcca39af20ab0"
  },
  {
    "title": "Discovering the Temples of Varanasi",
    "content": "Varanasi, often called the spiritual capital of India, is one of the oldest continuously inhabited cities in the world. Nestled on the banks of the sacred Ganges River, it is home to thousands of temples and bustling ghats where rituals, ceremonies, and prayers take place daily. The Kashi Vishwanath Temple, dedicated to Lord Shiva, is among the most revered. A boat ride at sunrise along the ghats reveals the spiritual pulse of the city, where life and death coexist in harmony. For anyone seeking a deep cultural and spiritual journey, Varanasi offers a transformative and timeless experience.",
    "category": "Travel",
    "image": "https://media.istockphoto.com/id/516984446/photo/varanasi-burning-grounds-at-night.webp?a=1&b=1&s=612x612&w=0&k=20&c=j4qpc4gkij7zVVuniYZiUu08pmCL3kfyWVtpHElNnqg=",
    "author": "680deb0dae7dcca39af20ab0"
  },
  {
    "title": "A Trip to Rajasthan's Forts and Palaces",
    "content": "Rajasthan is a land of royalty, known for its majestic forts, grand palaces, and vibrant culture. Cities like Jaipur, Jodhpur, and Udaipur are rich with architectural marvels that reflect centuries of Rajput heritage. The Amber Fort, Mehrangarh Fort, and City Palace are just a few awe-inspiring examples that transport visitors to an era of kings and warriors. Many palaces have now been converted into heritage hotels, offering a chance to live like royalty. Beyond the architecture, the colorful markets, traditional folk music, and warm hospitality make a trip to Rajasthan truly unforgettable.",
    "category": "Travel",
    "image": "https://plus.unsplash.com/premium_photo-1661963073823-6fde89371f00?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8",
    "author": "680deb0dae7dcca39af20ab0"
  },
  {
    "title": "The Golden Triangle: Delhi, Agra, and Jaipur",
    "content": "India’s Golden Triangle tour covers three iconic cities: Delhi, Agra, and Jaipur. Delhi offers a mix of history and modernity with landmarks like the Red Fort and India Gate. Agra is home to the magnificent Taj Mahal, a symbol of eternal love and a UNESCO World Heritage site. Jaipur, the Pink City, dazzles with palaces, forts, and colorful bazaars. Together, these cities provide a complete introduction to India’s rich history, culture, and architecture, making the Golden Triangle one of the most popular and rewarding travel circuits in the country.",
    "category": "Travel",
    "image": "https://images.unsplash.com/photo-1589000865526-e0db02c3d7ad?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8VGhlJTIwR29sZGVuJTIwVHJpYW5nbGUlM0ElMjBEZWxoaSUyQyUyMEFncmElMkMlMjBhbmQlMjBKYWlwdXJ8ZW58MHx8MHx8fDA%3D",
    "author": "680deb0dae7dcca39af20ab0"
  },
  {
    "title": "Exploring the Himalayas: Trekking in Uttarakhand",
    "content": "Uttarakhand, known as the 'Land of the Gods', is a haven for trekking enthusiasts. Nestled in the Indian Himalayas, the state offers a range of trails suitable for both beginners and experienced trekkers. Popular routes include the Valley of Flowers, Roopkund, and Kedarkantha treks, each showcasing breathtaking views of snow-capped peaks, alpine meadows, and remote villages. The region is also dotted with ancient temples and ashrams, adding a spiritual touch to the adventure. Trekking in Uttarakhand is not just a physical journey—it’s a soul-refreshing escape into nature’s grandeur.",
    "category": "Travel",
    "image": "https://plus.unsplash.com/premium_photo-1661810803959-f91f5195138e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8VHJla2tpbmclMjBpbiUyMFV0dGFyYWtoYW5kfGVufDB8fDB8fHww",
    "author": "680deb0dae7dcca39af20ab0"
  },
  {
    "title": "Goa: A Paradise for Beach Lovers",
    "content": "Goa is India’s premier beach destination, famous for its golden sands, vibrant nightlife, and relaxed coastal vibe. From the bustling beaches of Baga and Calangute to the serene shores of Palolem and Agonda, there’s a perfect beach for every traveler. Goa also boasts a rich Portuguese heritage, visible in its colonial architecture, churches, and cuisine. Activities like water sports, dolphin watching, and flea market shopping add to the experience. Whether you're looking for adventure or serenity, Goa's charm and diversity make it an essential stop on any Indian itinerary.",
    "category": "Travel",
    "image": "https://media.istockphoto.com/id/535168027/photo/india-goa-palolem-beach.webp?a=1&b=1&s=612x612&w=0&k=20&c=C0XaAWEkus7pLTGKZOy75Mu0P4VoVorNAWsxY5faLMA=",
    "author": "680deb0dae7dcca39af20ab0"
  },

  {
    "title": "The Importance of Yoga in Indian Culture",
    "content": "Yoga, originating from ancient India, is more than just physical exercise; it's a holistic practice encompassing mind, body, and spirit. Rooted in texts like the Bhagavad Gita and the Yoga Sutras of Patanjali, yoga offers profound insights into the nature of existence and the path to self-realization. In Indian culture, yoga is a way of life, promoting physical health, mental clarity, and spiritual growth. Practices such as asanas (postures), pranayama (breathing techniques), and meditation are integral to daily routines, aiming to achieve inner peace and balance. The global recognition of yoga, especially through International Yoga Day, underscores its universal appeal and the timeless wisdom it offers.",
    "category": "Lifestyle",
    "image": "https://images.unsplash.com/photo-1531714680149-1bde6d4d4c5c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWElMjB5b2dhfGVufDB8fDB8fHww",
    "author": "680deb0dae7dcca39af20ab0"
  },
  {
    "title": "Indian Festivals: A Celebration of Culture",
    "content": "India's festivals are a vibrant tapestry of its rich cultural and religious diversity. Celebrations like Diwali, Holi, Eid, and Christmas are marked by colorful decorations, traditional music, dance, and communal feasts. These festivals not only honor religious traditions but also foster unity and joy among communities. For instance, Diwali, the festival of lights, symbolizes the victory of light over darkness, while Holi celebrates the arrival of spring with a riot of colors. Such festivals are integral to Indian life, reflecting the country's ethos of inclusivity and shared heritage.",
    "category": "Lifestyle",
    "image": "https://images.unsplash.com/photo-1592843997881-cab3860b1067?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwZmVzdGl2YWxzfGVufDB8fDB8fHww",
    "author": "680deb0dae7dcca39af20ab0"
  },
  {
    "title": "Traditional Indian Clothing: A Blend of Heritage and Fashion",
    "content": "Traditional Indian clothing is a reflection of the country's rich cultural heritage and diversity. Garments like sarees, lehengas, salwar kameez, and kurtas are adorned with intricate embroidery, vibrant colors, and luxurious fabrics. Each region in India boasts its unique textile traditions, such as Banarasi silk from Varanasi or Kanjeevaram from Tamil Nadu. These outfits are not only worn during festivals and weddings but have also influenced global fashion trends. The fusion of traditional designs with contemporary styles showcases India's ability to preserve its heritage while embracing modernity.",
    "category": "Lifestyle",
    "image": "https://img.businessoffashion.com/resizer/v2/QT4SPJYD3NHOZPPYMHZ4BVQEPM.jpg?auth=aea3355d40b3fb175157e64c37e651390dd3bea88afc6a0aa67b3166f94c8bbb&width=1440",
    "author": "680deb0dae7dcca39af20ab0"
  },
  {
    "title": "Sustainable Living in India: Eco-Friendly Practices",
    "content": "Sustainability has long been embedded in Indian lifestyles, with practices like using reusable bags, conserving water, and relying on public transport being commonplace. Traditional methods, such as rainwater harvesting and organic farming, highlight the country's commitment to eco-friendly living. Urban areas are increasingly adopting green initiatives, including the development of Miyawaki forests and the construction of roads using recycled plastic. These efforts, combined with a cultural emphasis on minimalism and harmony with nature, position India as a leader in sustainable living practices.",
    "category": "Lifestyle",
    "image": "https://plus.unsplash.com/premium_photo-1728900116066-353260c053c1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHN1c3RhaW5hYmxlJTIwbGl2aW5nJTIwZWNvJTIwZnJpZW5kbHl8ZW58MHx8MHx8fDA%3D",
    "author": "680deb0dae7dcca39af20ab0"
  },
  {
    "title": "The Growth of Organic Farming in India",
    "content": "Organic farming in India has seen significant growth, with over 2.78 million hectares under certified organic cultivation as of March 2020. States like Madhya Pradesh, Maharashtra, and Rajasthan lead in organic farming practices. The shift towards organic agriculture is driven by increasing consumer awareness of health and environmental benefits. Government initiatives, such as the Paramparagat Krishi Vikas Yojana (PKVY), support farmers in transitioning to organic methods. This movement not only ensures safer food consumption but also promotes sustainable farming practices that preserve soil health and biodiversity.",
    "category": "Lifestyle",
    "image": "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b3JnYW5pYyUyMGZhcm1pbmd8ZW58MHx8MHx8fDA%3D",
    "author": "680deb0dae7dcca39af20ab0"
  },
  {
    "title": "Indian Weddings: A Cultural Extravaganza",
    "content": "Indian weddings are renowned for their grandeur, vibrant rituals, and deep-rooted traditions. Spanning several days, ceremonies like the Mehendi, Sangeet, and the wedding itself are filled with music, dance, and elaborate decorations. Attire plays a significant role, with brides often wearing ornate sarees or lehengas, and grooms donning sherwanis. Regional variations add to the diversity, with each community bringing its unique customs and flavors to the celebration. Beyond the festivities, Indian weddings symbolize the union of families and the beginning of a lifelong journey together.",
    "category": "Lifestyle",
    "image": "https://images.unsplash.com/photo-1589182377525-86b4797b3254",
    "author": "680deb0dae7dcca39af20ab0"
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    await Post.deleteMany();
    await Post.insertMany(posts);
    console.log('Seeding successful!');
  } catch (err) {
    console.error('Seeding failed:', err);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

seedDatabase();