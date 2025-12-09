const AlphaPage =  {
  
  template: `
    <div>
      <!-- Top Header -->
      <div class="top-header">
        <div class="logo">Shopverse</div>
        <div class="hamburger-icon" @click="navigateTo('/ham1')">
          <svg class="hamburger-svg" viewBox="0 0 100 80" width="32" height="32">
            <rect width="100" height="10" rx="4"></rect>
            <rect y="30" width="100" height="10" rx="4"></rect>
            <rect y="60" width="100" height="10" rx="4"></rect>
          </svg>
        </div>
      </div>

      <!-- Banner -->
      <img src="/20251008_060759.png" class="img" />

      <!-- Search Bar -->
      <div class="store-search">
        <svg class="search-svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="green" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="search"
class="search-input"
          v-model="searchQuery"
          @input="handleSearch"
          placeholder="Search by brand name or location..."
        />
      </div>

      <!-- Storefront Results -->
      <div class="search-results">
        <div v-if="loading" class="loading-message">Searching...</div>


    
    <!-- Loading state: show skeleton cards -->
    <div v-if="loading" class="storefront-grid">
      <div class="storefront-card placeholder-card" v-for="n in 3" :key="n">
        <div class="brand-bar">
          <span class="arrow">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6" />
      </svg>
          </span>

<span class="brand-name">{{ store.name || 'Unknown Brand' }}</span>
<img v-if="store.verified" src="/file_000000009a6871f49bb434c66ba49776.png" class="verified-badge" />

          <span class="arrow">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6" />
      </svg>
          </span>
        </div>
        <div class="logo-circle"></div>
        <div class="store-location"></div>
        <button class="visit-btn" disabled>VISIT</button>
      </div>
    </div>
    
    <!-- Real data cards -->
    <div v-else-if="filteredResults.length" class="storefront-grid">
      <div v-for="store in filteredResults" :key="store.id" class="storefront-card">
        
        <div class="brand-bar">
          <span class="arrow">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6" />
      </svg>
          </span>

<span class="brand-name">{{ store.name || 'Unknown Brand' }}</span>
<img v-if="store.verified" src="/file_000000009a6871f49bb434c66ba49776.png" class="verified-badge" />

       <span class="arrow">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6" />
      </svg>
          </span>
        </div>
        
    <div class="profile-pic-wrapper">
      <div class="img-container">
<img :src = "isLogoValid(store.logo) ? store.logo : defaultAvatar"
@error = "onLogoError"
class = "img" />
</div></div>
        
        <div class="store-location">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
          </svg>
          <span v-if="store.location">{{ store.location }}</span>
          <span v-else class="location-ghost">No location</span>
        </div>
        
<div class="store-status" :class="getStoreStatus(store)">
  {{ getStoreStatus(store) }}
</div>

<button @click="navigateToStore(store.slug)" class="visit-btn">VISIT</button>
      </div>
    </div>
    
    <!-- No results -->
    <div v-else class="no-results">No store Available.</div>
    
  </div>
    </div>
  `,
  
  data() {
    return {
      searchQuery: '',
      filteredResults: [],
    stores: [
  {
    id: 1,
    name: 'NeoTech',
    logo: '/IMG-20251208-WA0006.jpg',
    slug: 'neotech',
    verified: false,
    location: 'Lagos, Nigeria',
    address: '12 Computer St, Ikeja',
    email: 'tech@example.com',
    call: '08026450331',
    whatsapp: '07043682582',
    category: 'Avionics',
    products: [
      { 
        id: 1, 
        title: 'NeoDrone X1', 
        price: '250,000', 
        description: 'Advanced drone with 4K camera and long battery life.', 
        images: ['/Screenshot_20250531-052806.png', '/Screenshot_20250531-052728.png'] 
      },
      { 
        id: 2, 
        title: 'NeoSmart Watch', 
        price: '55,000', 
        description: 'Smartwatch with heart rate monitor and GPS.', 
        images: ['/Screenshot_20250530-185308.png', '/Screenshot_20250530-185601.png'] 
      },
      { 
        id: 3, 
        title: 'NeoVR Headset', 
        price: '120,000', 
        description: 'Immersive VR experience with adjustable lenses.', 
        images: ['/Screenshot_20250530-185751.png', '/Screenshot_20250531-052728.png'] 
      },
      { 
        id: 4, 
        title: 'NeoWireless Earbuds', 
        price: '30,000', 
        description: 'Noise-canceling earbuds with 10-hour battery.', 
        images: ['/Screenshot_20250531-052359.png', '/Screenshot_20250531-052806.png'] 
      }
    ],
    status: {
      openingHours: {
        Monday: { open: '09:00', close: '20:00' },
        Tuesday: { open: '09:00', close: '20:00' },
        Wednesday: { open: '09:00', close: '20:00' },
        Thursday: { open: '09:00', close: '20:00' },
        Friday: { open: '09:00', close: '20:00' },
        Saturday: { open: '10:00', close: '20:30' },
        Sunday: null
      },
      exceptions: ['2025-12-25', '2025-01-01']
    }
  },

  // SECOND STORE
  {
    id: 2,
    name: 'AeroTech',
    logo: '/IMG-20251208-WA0005.jpg',
    slug: 'aerotech',
    verified: true,
    location: 'Abuja, Nigeria',
    address: '45 Innovation Rd, Central Business District',
    email: 'contact@aerotech.com',
    call: '08026450331',
    whatsapp: '07043682582',
    category: 'Electronics',
    products: [
      { 
        id: 1, 
        title: 'AeroSpeaker Pro', 
        price: '45,000', 
        description: 'High-fidelity wireless speaker with 12-hour battery.', 
        images: ['https://via.placeholder.com/150?text=AeroSpeaker+1', 'https://via.placeholder.com/150?text=AeroSpeaker+2'] 
      },
      { 
        id: 2, 
        title: 'AeroSmart Lamp', 
        price: '20,000', 
        description: 'Smart LED lamp with app control and color adjustment.', 
        images: ['https://via.placeholder.com/150?text=AeroLamp+1', 'https://via.placeholder.com/150?text=AeroLamp+2'] 
      },
      { 
        id: 3, 
        title: 'AeroPower Bank', 
        price: '15,000', 
        description: '10,000mAh portable charger with fast charging support.', 
        images: ['https://via.placeholder.com/150?text=AeroBank+1', 'https://via.placeholder.com/150?text=AeroBank+2'] 
      },
      { 
        id: 4, 
        title: 'AeroHeadphones', 
        price: '35,000', 
        description: 'Over-ear Bluetooth headphones with noise cancellation.', 
        images: ['https://via.placeholder.com/150?text=AeroHeadphones+1', 'https://via.placeholder.com/150?text=AeroHeadphones+2'] 
      }
    ],
    status: {
      openingHours: {
        Monday: { open: '08:00', close: '18:00' },
        Tuesday: { open: '08:00', close: '18:00' },
        Wednesday: { open: '08:00', close: '18:00' },
        Thursday: { open: '08:00', close: '18:00' },
        Friday: { open: '08:00', close: '18:00' },
        Saturday: { open: '09:00', close: '17:00' },
        Sunday: null
      },
      exceptions: ['2025-12-25']
    }
  }
],
      loading: false,
      debounceTimeout: null,
      defaultAvatar: "https://cdn-icons-png.flaticon.com/512/847/847969.png", // fallback avatar
    };
  },
  mounted() {
     this.filteredResults = [...this.stores];
    this.shuffleStores();
  },
  
     
  methods: {
    navigateTo(route) {
    this.$router.push(route);
  },
  
  
  getStoreStatus(store) {
  const now = new Date();
  const todayDate = now.toISOString().split("T")[0];
  
  // A — Check Special Closed Dates
  if (store.status.exceptions.includes(todayDate)) {
    return "Closed Today";
  }
  
  // B — Get today's day name (e.g., "Monday")
  const today = now.toLocaleDateString("en-US", { weekday: "long" });
  const schedule = store.status.openingHours[today];
  
  // C — Closed if no schedule
  if (!schedule || !schedule.open || !schedule.close) {
    return "Closed Today";
  }
  
  // D — Convert times
  const [openH, openM] = schedule.open.split(":").map(Number);
  const [closeH, closeM] = schedule.close.split(":").map(Number);
  
  const openTime = new Date();
  openTime.setHours(openH, openM, 0);
  
  const closeTime = new Date();
  closeTime.setHours(closeH, closeM, 0);
  
  // E — Time Logic
  if (now < openTime) {
    return "Opens Soon";
  }
  if (now >= openTime && now <= closeTime) {
    return "Open Now";
  }
  return "Closed";
},


isLogoValid(logo) {
    if (!logo) return false;
    if (logo.trim() === '') return false;
    if (logo.includes('REPLACE')) return false;
    return true;
  },
  onLogoError(e) {
    e.target.src = this.defaultAvatar;
  },
  
shuffleStores() {
  for (let i = this.stores.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [this.stores[i], this.stores[j]] = [this.stores[j], this.stores[i]];
  }
  this.filteredResults = [...this.stores];
},


  // Replace or add this block
  navigateToStore(slug) {
  const selectedStore = this.stores.find(s => s.slug === slug);
  if (selectedStore) {
    localStorage.setItem('selectedStore', JSON.stringify(selectedStore));
  }
  this.$router.push(`/store/${slug}`);
},


    

    handleSearch() {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = setTimeout(() => {
        const q = this.searchQuery.trim().toLowerCase();
        if (q) {
          this.filteredResults = this.stores.filter(store =>
            (store.name && store.name.toLowerCase().includes(q)) ||
            (store.location && store.location.toLowerCase().includes(q))
          );
        } else {
          this.filteredResults = this.stores;
        }
      }, 300);
    }
  },
  
  

  
};


const Ham1Page = {
  template: `
  <div class="ham-page">
    <!-- Header -->
    <div class="ham-header">
      <div class="back-icon" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" stroke="#00b36b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </div>
      <center><span class="ham-title">Menu</span></center>
    </div>

    <!-- Menu Grid -->
    <div class="menu-grid">
      <div
        v-for="(item, index) in menuItems"
        :key="index"
        class="menu-card"
        @click="navigateTo(item.route)"
      >
        <div class="menu-icon" v-html="item.icon"></div>
        <span>{{ item.label }}</span>
      </div>
    </div>
  </div>
  `,

  data() {
    return {
      menuItems: [
        {
          label: "Add account",
          route: "/createaccount",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#00b36b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
            <path d="M16 21v-2a4 4 0 00-8 0v2" />
            <path d="M19 8v6" />
            <path d="M22 11h-6" />
          </svg>`
        },
        {
          label: "Future Upgrades",
          route: "/upgrade",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#00b36b" stroke-width="2">
            <path d="M12 2l4 8H8l4-8zm0 8v12"/>
          </svg>`
        },
        {
          label: "FAQs",
          route: "/faq",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#00b36b" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>`
        },
        {
          label: "Donation",
          route: "/donate",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#009e5f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 21C12 21 4 13.5 4 8a4 4 0 0 1 8 0 4 4 0 0 1 8 0c0 5.5-8 13-8 13z" />
          </svg>`
        },
        {
          label: "About Us",
          route: "/about",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#00b36b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 21C6.48 21 2 16.52 2 11S6.48 1 12 1s10 4.48 10 10-4.48 10-10 10z"/>
          </svg>`
        },
        {
          label: "Customer Care",
          route: "/support",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#00b36b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 16.92V7.08a2 2 0 0 0-1.1-1.79l-8-4.62a2 2 0 0 0-1.8 0l-8 4.62A2 2 0 0 0 2 7.08v9.84a2 2 0 0 0 1.1 1.79l8 4.62a2 2 0 0 0 1.8 0l8-4.62a2 2 0 0 0 1.1-1.79z" />
            <line x1="12" y1="2" x2="12" y2="22" />
          </svg>`
        }
      ]
    };
  },

  methods: {
    goBack() {
      this.$router.back();
    },
    navigateTo(route) {
      this.$router.push(route);
    }
  }
};


const UpgradePage = {};


const FAQsPage = {};


const CreateAccountPage = {
  template: `
    <div class="create-account-page">
      <div class="placeholder-box">
        <h2>🚧 Under Development</h2>
        <p>We're currently building this page. You can reach us directly to set up your store on Shopverse.</p>
        
        <!-- Contact Buttons -->
        <div class="contact-buttons">
          <button @click="sendWhatsApp">WhatsApp Us</button>
          <button @click="callUs">Call Us</button>
          <button @click="openFacebook">Facebook</button>
        </div>

        <!-- Pricing Info -->
        <div class="pricing-info">
          <h3>Pricing for Store Setup</h3>
          <ul>
            <li>Per Month: ₦6,000</li>
            <li>Per Year: ₦60,000</li>
            <li>Recommended: Pay for 3 or 6 months to avoid freezing stores monthly.</li>
          </ul>
        </div>

        <!-- Target Audience -->
        <div class="target-audience">
          <h3>Who Can Join Shopverse?</h3>
          <ul>
            <li>Fashion vendors</li>
            <li>Electronics & gadget sellers</li>
            <li>Hair & wig businesses</li>
            <li>Shoe sellers</li>
            <li>Perfume vendors</li>
            <li>Skin care vendors</li>
            <li>Bag sellers</li>
            <li>Furniture vendors</li>
            <li>Real estate vendors</li>
            <li>Small boutiques & others</li>
          </ul>
        </div>

        <p class="note">We’ll help you get started quickly while this page is under construction!</p>
      </div>
    </div>
  `,
  data() {
    return {
      whatsappNumber: '+2347043682582', // your WhatsApp number
      callNumber: '+2348026450331', // your phone number
      facebookUrl: 'https://www.facebook.com/profile.php?id=61553857205701', // your Facebook page
      };
  },
  methods: {
    sendWhatsApp() {
      const number = this.whatsappNumber.replace('+', '');
      const text = encodeURIComponent("Hi! I want to set up my store on Shopverse.");
      window.open(`https://wa.me/${number}?text=${text}`, '_blank');
    },
    callUs() {
      window.location.href = `tel:${this.callNumber}`;
    },
    openFacebook() {
      window.open(this.facebookUrl, '_blank');
    }
  }
};




   
const DonationPage = {};


const AboutUsPage = {
    template: `
    
    `,
 };
 
 
const CustomerCarePage = {
    template: `
    
    `,
    
};


/* Store Page */
const StorePage = {

       template: `

<div v-if="store" class="top-headerX">  
  <div @click="goBack">  
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  
        <polyline points="15 18 9 12 15 6" />  
      </svg>  
  </div>  <img :src = "store.logo && store.logo.trim() ? store.logo : defaultAvatar"
alt = "Logo"
class = "store-logoX"
@error = "store.logo = defaultAvatar" />

 <h3 class="nameX">  
  {{ store.name }}  
  <img v-if="store.verified" src="/file_000000009a6871f49bb434c66ba49776.png"  class="verified-badge" />  
</h3>    
<div class="icons-right">  
  <!-- Share Icon -->  
  <span class="share-icon" @click="sharePage">  
  <svg 
  viewBox="0 0 24 24" 
  width="20" 
  height="20" 
  fill="none" 
  stroke="currentColor" 
  stroke-width="2" 
  stroke-linecap="round" 
  stroke-linejoin="round"
>
  <circle cx="18" cy="5" r="3"></circle>
  <circle cx="6" cy="12" r="3"></circle>
  <circle cx="18" cy="19" r="3"></circle>
  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
  <line x1="8.59" y1="10.49" x2="15.42" y2="6.51"></line>
</svg> 
  </span>    
  
  <!-- Status Icon -->  
  <span class="status-icon" @click="showStoreStatus">

<svg width="22" height="20" viewBox="0 0 24 24" fill="none"  
stroke="#00b36b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<circle cx="12" cy="12" r="10"></circle>
<line x1="12" y1="16" x2="12" y2="12"></line>
<line x1="12" y1="8" x2="12.01" y2="8"></line>
</svg>


</span>

</div> 
</div>  
<div v-if="statusModalVisible" class="status-modal-overlay">  
  <div class="status-modal-box">  
    <div class="status-modal-header">  
      <span class="status-modal-title">Store Status</span>  
      <span class="status-modal-close" @click="closeStatusModal">&times;</span>  
    </div>  <div class="status-modal-body">  
  <pre>{{ statusModalMessage }}</pre>  
</div>

  </div>  
</div> 

<input
ref="searchInput"
type="search"
v-model="searchQuery"
@input="searchProducts"
placeholder="Search for products..."
class="search-inputX"

@focus="searchProducts"/>

<!-- Search Results -->    <div v-if="searchResults.length" class="product-grid">  <div class="product-card" v-for="product in searchResults" :key="product.id">  

  <!-- Main Image -->

<img  :src = "(product.images && product.images.length ? product.images[activeImage[product.id] || 0] : defaultAvatar)"
@error = "product.images[activeImage[product.id]] = defaultAvatar"
alt = "Product Image"
class = "product-img" />

<!-- Thumbnails -->  
  <div class="thumbnail-row">  
    <img  
      v-for="(img, i) in product.images"  
      :key="i"  
      :src="img"  
      class="thumbnail"  
      :class="{ active: activeImage[product.id] === i }"  
      @click="activeImage[product.id] = i"  
    />  
  </div>  

  <!-- Info -->  
  <h4 class="product-title">{{ product.title }}</h4>  
  <p class="product-price">₦{{ product.price }}</p>  

 <div class="product-actions">  
 <button class="view-btn" @click="viewProduct(product)">View</button>

   <!-- In product card -->  <button class="btn-shareX" @click="shareProduct(product)"><i class="fas fa-share-alt"></i>

</div>  </div>

  </div>  <div v-if="showModal" class="modal-overlayX" @click.self="closeModal">  
  <div class="modal-contentX">  <!-- Main Image -->  
<img v-if="selectedProduct.images && selectedProduct.images.length"  
     :src="selectedProduct.images[activeModalImage]"  
     alt="Product Image"  
     class="modal-image animate-fade" />  

<!-- Thumbnails -->  
<div v-if="selectedProduct.images && selectedProduct.images.length > 1" class="thumbnail-row modal-thumbs">  
  <img v-for="(img, i) in selectedProduct.images"  
       :key="i"  
       :src="img"  
       class="thumbnail"  
       :class="{ active: activeModalImage === i }"  
       @click="activeModalImage = i" />  
</div>  

<!-- Info -->  
<div class="info-section">  
  <h4>{{ selectedProduct.title }}</h4>  
  <p class="price">₦{{ selectedProduct.price }}</p>  
  <p class="description">{{ selectedProduct.description }}</p>  
</div>  

<!-- Action Buttons -->  
<div class="action-buttons">  
  <button class="btn-primaryX" @click="sendMessage">Message</button>  
    
  <button class="btn-emailX" @click="emailProduct"><i class="fas fa-envelope"></i></button>  
    
<button class="btn-callX" @click="startCall">
  <i class="fas fa-phone-alt"></i>
</button>

    
<button class="btn-closeX" @click="closeModal">Close</button>


</div>

  </div>   
  </div>   
  <!-- No Results -->    
  <p   
    v-else-if="searchQuery && !searchResults.length && !loading"  
    class="not-foundX"  
  >  
    No matching products found.  
  </p>  <div v-if="toast.visible" :class="['toast', toast.type]">  
  {{ toast.message }}  
</div>  
`,  
data() {  
    return {  
      // Product display control  
      activeImage: {},  
      activeModalImage: 0,  defaultAvatar: "https://cdn-icons-png.flaticon.com/512/847/847969.png",

// Modal  
  showModal: false,  
  selectedProduct: null,  
    
  // Contact info  
  whatsappNumber: '',  
  callNumber: '',  
    
  // Toast system  
  toast: {  
message: '',  
type: 'success', // 'success', 'error', 'info'  
visible: false

},
toastTimeout: null,

// Store details

store: null,
// Core data

searchResults: [],  
  searchQuery: '',  
  debounceTimeout: null,

statusModalVisible: false,
statusModalMessage: "",

};
},

mounted() {
// Try to get the store selected from AlphaPage
const savedStore = JSON.parse(localStorage.getItem('selectedStore'));

if (savedStore) {
this.store = savedStore;

this.whatsappNumber = savedStore.whatsapp || '';
this.callNumber = savedStore.call || '';

// Shuffle products when loading
this.searchResults = Array.isArray(savedStore.products) ?
this.shuffleArray([...savedStore.products]) :
[];
}

else {
// If no store selected, redirect back to AlphaPage
this.showToast("Please select a store first.", "error", 3000);
this.$router.push('/'); // Replace '/' with AlphaPage route if different
}
},

watch: {
showModal(newVal) {
document.body.style.overflow = newVal ? 'hidden' : 'auto';
}
},

methods: {
showStatusModal(message) {
this.statusModalMessage = message;
this.statusModalVisible = true;
},
closeStatusModal() {
this.statusModalVisible = false;
},

shuffleArray(array) {
for (let i = array.length - 1; i > 0; i--) {
const j = Math.floor(Math.random() * (i + 1));
[array[i], array[j]] = [array[j], array[i]];
}
return array;
},

// Share product link

shareProduct(product = null) {
  // Use the passed product or fallback to selectedProduct (modal)
  const p = product || this.selectedProduct;
  if (!p) return this.showToast("No product to share", "error");
  
  const text = `Check out this product: ${p.title} - ₦${p.price}`;
  const url = window.location.href;
  
  if (navigator.share) {
    navigator.share({
        title: p.title,
        text: text,
        url: url
      })
      .catch(() => this.showToast("Share failed", "error"));
  } else {
    // Ensure template literals are used properly
    navigator.clipboard.writeText(`${text} - ${url}`)
      .then(() => this.showToast("Product link copied!", "success"))
      .catch(() => this.showToast("Failed to copy link", "error"));
  }
},

// Email seller
emailProduct() {
  if (!this.selectedProduct) {
    this.showToast("No product selected!", "error");
    return;
  }
  
  // Ensure template literals use backticks
  const subject = encodeURIComponent(`Interested in ${this.selectedProduct.title}`);
  const body = encodeURIComponent(
    `Hi,\n\nI am interested in this product:\n${this.selectedProduct.title} - ₦${this.selectedProduct.price}\n\nPlease get back to me.`
  );
  
  // Use store email from status info
  const storeEmail = this.store?.email;
  if (!storeEmail) {
    this.showToast("Store email not available!", "error");
    return;
  }
  
  // Properly wrap mailto URL in backticks
  window.location.href = `mailto:${storeEmail}?subject=${subject}&body=${body}`;
},


/** Toast system */  
showToast(message, type = 'success', duration = 2000) {

this.toast.message = message;
this.toast.type = type;
this.toast.visible = true;

clearTimeout(this.toastTimeout);
this.toastTimeout = setTimeout(() => {
this.toast.visible = false;
}, duration);
},

showStoreStatus() {
  if (!this.store) {
    this.showToast("No store info available.", "error");
    return;
  }
  
  const now = new Date();
  const todayDate = now.toISOString().split("T")[0];
  
  // Check exceptions
  if (this.store.status?.exceptions?.includes(todayDate)) {
    this.storeStatusText = "Closed Today";
  } else {
    // Get today's schedule
    const today = now.toLocaleDateString("en-US", { weekday: "long" });
    const schedule = this.store.status?.openingHours?.[today];
    
    if (!schedule || !schedule.open || !schedule.close) {
      this.storeStatusText = "Closed Today";
    } else {
      const [openH, openM] = schedule.open.split(":").map(Number);
      const [closeH, closeM] = schedule.close.split(":").map(Number);
      
      const openTime = new Date();
      openTime.setHours(openH, openM, 0);
      
      const closeTime = new Date();
      closeTime.setHours(closeH, closeM, 0);
      
      if (now < openTime) this.storeStatusText = "Opens Soon";
      else if (now >= openTime && now <= closeTime) this.storeStatusText = "Open Now";
      else this.storeStatusText = "Closed";
    }
  }
  
  // Show modal with dynamic status
  const message = `
Products: ${this.store.products?.length || 0}
Category: ${this.store.category || "N/A"}
Location: ${this.store.location || "N/A"}
Address: ${this.store.address || "N/A"}
Email: ${this.store.email || "N/A"}
WhatsApp: ${this.store.whatsapp || "N/A"}
Call: ${this.store.call || "N/A"}
Status: ${this.storeStatusText}
  `;
  
  this.showStatusModal(message.trim());

  
},

/** Normalize phone numbers (for WhatsApp / call) */  
normalizeNumber(number) {

if (!number) return '';
number = number.replace(/[^0-9+]/g, '');
if (number.startsWith('+')) return number;
if (number.startsWith('0')) return '+234' + number.slice(1);
return '+234' + number;
},

/** Search functionality (debounced) */  
searchProducts() {
  clearTimeout(this.debounceTimeout);

  this.debounceTimeout = setTimeout(() => {
    const raw = this.searchQuery.trim().toLowerCase().replace(/[₦,]/g, '');

    // If search query is empty, show all products
    if (!raw) {
      this.searchResults = Array.isArray(this.store.products) ? [...this.store.products] : [];
      return;
    }

    // Fuzzy search
    const escaped = raw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');  
    const fuzzyPattern = escaped.split('').join('.*');  
    const fuzzyRegex = new RegExp(fuzzyPattern, 'i');  

    this.searchResults = this.store.products.filter(p => {  
      const title = p.title?.toLowerCase() || '';  
      const desc = p.description?.toLowerCase() || '';  
      const price = p.price?.toString() || '';  
      return fuzzyRegex.test(title) || fuzzyRegex.test(desc) || fuzzyRegex.test(price);  
    });  
  }, 300);
},



/** Product modal navigation */  
prevImage() {  
if (!this.selectedProduct?.images) return;  
this.activeModalImage =  
  (this.activeModalImage - 1 + this.selectedProduct.images.length) %  
  this.selectedProduct.images.length;

},
nextImage() {
if (!this.selectedProduct?.images) return;
this.activeModalImage =
(this.activeModalImage + 1) % this.selectedProduct.images.length;
},

/** Modal control */  
viewProduct(product) {  
this.selectedProduct = product;  
this.showModal = true;  
this.activeModalImage = 0; // fixed

},
closeModal() {
this.showModal = false;
this.selectedProduct = null;
this.activeModalImage = 0; // fixed
},

/** Messaging / Call */  
sendMessage() {  
  if (!this.whatsappNumber) {  
    this.showToast("WhatsApp number not set yet.", "error");  
    return;  
  }  
  const number = this.normalizeNumber(this.whatsappNumber).replace('+', '');  
  const text = encodeURIComponent(`Hi! I'm interested in your product: ${this.selectedProduct?.title}`);  
  const url = `https://wa.me/${number}?text=${text}`;  
  window.open(url, '_blank');  
  this.showToast(`Opening WhatsApp chat with ${number}`, 'success', 3000);  
},  
  
startCall() {  
  if (!this.callNumber) {  
    this.showToast("Call number not set yet.", "error");  
    return;  
  }  
  const number = this.normalizeNumber(this.callNumber);  
  window.location.href = `tel:${number}`;  
  this.showToast(`Dialing ${number}...`, 'info', 3000);  
},  
  

  
  
/** Navigation */  
goBack() {  
  this.$router.back();  
},  


  
/** Share page handler */  
sharePage() {  
  const platformName = "Microcart";  
  const brandName = this.store.name;  
  const pageURL = window.location.href;  
  const shareText = `${platformName}/${brandName} - Check out this store: ${pageURL}`;  
    
  if (navigator.share) {  
    navigator.share({  
        title: `${platformName} Store`,  
        text: shareText,  
        url: pageURL  
      })  
      .then(() => console.log("Shared successfully"))  
      .catch(err => console.error("Share failed:", err));  
  } else {  
    navigator.clipboard.writeText(shareText)

.then(() => this.showToast("Store link copied to clipboard!", "success"))
.catch(() => this.showToast("Failed to copy link", "error"));
}
},

/** Focus on search bar */  
focusSearch() {  
  this.$refs.searchInput && this.$refs.searchInput.focus();  
},


}


};





const routes = 
 [
{ path: '/', component: AlphaPage },

{ path: '/ham1', component: Ham1Page },


{ path: '/upgrade', component: UpgradePage },
   
{ path: '/faq', component: FAQsPage },
    
    
 { path: '/createaccount', component: CreateAccountPage },
 
{ path: '/donate', component: DonationPage },

{ path: '/support', component: CustomerCarePage },
  
{ path: '/about', component: AboutUsPage},
     

 
{ path: '/store/:slug', component: StorePage },
 
     
     

      ];

    const router = VueRouter.createRouter({
      history: VueRouter.createWebHashHistory(),
      routes
    });

    const app = Vue.createApp({});
    app.use(router);
    app.mount('#app');