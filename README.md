# UniScholarPath

Welcome to UniScholarPath, your one-stop solution for managing scholarships and university applications!

## Description

UniScholarPath is a Scholarship Management System that allows students to search for suitable universities and scholarships, as well as apply for scholarships seamlessly. With three types of users - default users, admins, and moderators - role-based access ensures efficient management.

## Live Site

Explore UniScholarPath live: [UniScholarPath Live Site](https://unischolarpath.web.app/)

## Features

- **Role-based Access:** Users are categorized as default users, admins, or moderators, with corresponding dashboard access.
- **Scholarship Search:** Easily search and browse through scholarships based on criteria like application fees and post date.
- **Application Process:** Apply for scholarships directly through the system, complete with payment integration.
- **Authentication:** Implement email/password-based authentication with social login options for enhanced security.
- **User Dashboard:** Personalized dashboard for users to view profile, applications, and reviews.
- **Admin Dashboard:** Manage scholarships, users, reviews, and applications efficiently with role-based access.
- **Moderator Dashboard:** Access to manage scholarships, reviews, and applications, ensuring smooth operations.
- **Responsive Design:** Enjoy a seamless browsing experience across all devices.
- **Custom Styling:** Tailwind CSS for customizable designs, ensuring a visually appealing interface.
- **Type Checking:** PropTypes for runtime type checking, enhancing reliability.
- **Alerts and Toasts:** Utilize SweetAlert2 for beautiful pop-up modals and toast notifications.
- **Database Management:** Firebase for backend services, including hosting and database management.
- **Additional Features:**  404 Not Found page for invalid routes.Comprehensive admin and moderator dashboards for efficient management.User-friendly application process with clear instructions and feedback. Implement Axios interceptor. Implement a price based filtering system on All Scholarship route.
## Technologies Used

- [React Router](https://reactrouter.com/en/main/start/tutorial) - For client-side routing
- [Tailwind CSS](https://tailwindcss.com/) - For custom styling
- [PropTypes](https://www.npmjs.com/package/prop-types) - For runtime type checking
- [SweetAlert2](https://sweetalert2.github.io/#examples) - For beautiful pop-up modals
- [Font Awesome](https://fontawesome.com/) - For a comprehensive library of icons
- [Firebase](https://console.firebase.google.com/) - For hosting and backend services
- [DaisyUI](https://daisyui.com/) - For additional Tailwind CSS components
- [Mixkit](https://mixkit.co/) - For royalty-free music and sound effects
- [react-simple-typewriter](https://www.npmjs.com/package/react-simple-typewriter) - For a simple typewriter effect
- [react-aos](https://michalsnik.github.io/aos/) - For animated  effects

- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Axios](https://axios-http.com/docs/intro)
- [React Icons](https://react-icons.github.io/react-icons/search/#q=person)
- [React Router Dom](https://reactrouter.com/en/main)
- [SweetAlert2](https://sweetalert2.github.io/)
- [React Helmet Async](https://www.npmjs.com/package/react-helmet-async)
- [React Tilt](https://www.npmjs.com/package/react-tilt)


## .env.local
### frontend
- VITE_APIKEY=  Your firebase APIKEY
- VITE_AUTHDOMAIN= Your firebase AUTHDOMAIN
- VITE_PROJECTID= Your firebase PROJECTID
- _VITE_STORAGEBUCKET= Your firebase STORAGEBUCKET
- VITE_MESSAGINGSENDERID= Your firebase MESSAGINGSENDERID
- VITE_APPID= Your firebase APPID
- VITE_API_URL= server api link
- VITE_IMAGEBB_API_API= API key from imageBB
- VITE_PAYMENT_GATEWAY_PK= PK key from stripe
### backend
- DB_USER= mongodb user name
- DB_PASS= password
- ACCESS_TOKEN_SECRET=your access token 
- STRIPE_SECRET_KEY= Your Stripe secret key

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
