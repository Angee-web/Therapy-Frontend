//this is our form control configuration file
export const registerFormControls = [
    {
      name: "userName",
  
      placeholder: "Enter your username",
      componentType: "input",
      type: "text",
      // options : []
    },
    {
      name: "email",
  
      placeholder: "Enter your email",
      componentType: "input",
      type: "text",
    },
  
    {
      name: "password",
  
      placeholder: "Enter your password",
      componentType: "input",
      type: "password",
    },
    // {
    //     name: "confirmPassword",
    //     label: "Confirm Password",
    //     placeholder: "Confirm your password",
    //     componentType: "input",
    //     type: "password",
    // },
  ];
  export const loginFormControls = [
    {
      name: "email",
  
      placeholder: "Enter your email",
      componentType: "input",
      type: "text",
    },
  
    {
      name: "password",
  
      placeholder: "Enter your password",
      componentType: "input",
      type: "password",
    },
    // {
    //     name: "confirmPassword",
    //     label: "Confirm Password",
    //     placeholder: "Confirm your password",
    //     componentType: "input",
    //     type: "password",
    // },
  ];
  
  //The form control configuration for the add product form
  export const addProductFormElements = [
    {
      id: "product-name",
      name: "name",
      label: "Product Name",
      placeholder: "Enter product name",
      componentType: "input",
      type: "text",
    },
    {
      id: "product-price",
      name: "price",
      label: "Product Price",
      placeholder: "Enter product price",
      componentType: "input",
      type: "number",
    },
    {
      id: "product-description",
      name: "description",
      label: "Product Description",
      placeholder: "Enter product description",
      componentType: "textarea",
    },
  
   
    {
      id: "product-type",
      name: "types",
      label: "Sub-category",
      placeholder: "Enter the Sub-category",
      componentType: "input",
      type: "string",
    },
    {
      id: "category",
      name: "category",
      label: "Category",
      componentType: "select",
      options: [
        { id: "type-man", value: "men", label: "Men" },
        { id: "type-woman", value: "women", label: "Women" },
        { id: "type-couples", value: "couples", label: "Couples" },
      ],
    },
    {
      id: "product-sales",
      name: "sales",
      label: "Sales (Optional)",
      placeholder: "Enter sales quantity (optional)",
      componentType: "input",
      type: "number",
    },
  
    // {
    //   id: "product-sizes",
    //   name: "sizes",
    //   label: "Add Product Variance",
    //   componentType: "dynamic",
    //   description:
    //     "Add sizes and their respective stock. Click 'Add Size' to add more.",
    //   initialValue: [{ size: "", stock: 0, color: "" }], // Updated to include color
    // },
  
    {
      id: "product-sizes",
      name: "sizes",
      label: "Product Sizes & Colors",
      componentType: "dynamicSizes",
      description:
        "Add sizes and their respective colors with stock availability. Click 'Add Size' to add more.",
      initialValue: [
        {
          size: "",
          colors: [
            {
              color: "",
              stock: 0,
            },
          ],
        },
      ],
    },
  ];
  
  // the form control for video product
  export const addVideoProductFormElements = [
    {
      id: "product-title",
      name: "title",
      label: "Product title",
      placeholder: "Enter video title",
      componentType: "input",
      type: "text",
    },
    {
      id: "video-price",
      name: "price",
      label: "Video Price",
      placeholder: "Enter Video price",
      componentType: "input",
      type: "number",
    },
    {
      id: "video-description",
      name: "description",
      label: "Video Description",
      placeholder: "Enter Video description",
      componentType: "textarea",
    },
  
  
    {
      id: "category",
      name: "category",
      label: "Category",
      componentType: "input",
      type: "text",
    },
    {
      id: "product-sales",
      name: "sales",
      label: "Sales (Optional)",
      placeholder: "Enter sales quantity (optional)",
      componentType: "input",
      type: "number",
  
    },
  ];
  
  //
  export const sortOptions = [
    { id: "price-low-high", label: "Price: Low - High" },
    { id: "price-high-low", label: "Price:  High - Low" },
    { id: "title-a-z", label: "Price:  A - Z" },
    { id: "title-z-a", label: "Price:  Z - A" },
  ];
  
  //The form control configuration for address form
  
  export const addressFormControls = [
    {
      id: "address",
      name: "address",
      label: "Address",
      placeholder: "Enter your address",
      componentType: "input",
      type: "text",
    },
    {
      id: "fullName",
      name: "fullName",
      label: "FullName",
      placeholder: "Enter your name",
      componentType: "input",
      type: "text",
    },
    {
      id: "email",
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      componentType: "input",
      type: "text",
    },
    {
      id: "city",
      name: "city",
      label: "City",
      placeholder: "Enter your city",
      componentType: "input",
      type: "text",
    },
    {
      id: "phoneNumber",
      name: "phoneNumber",
      label: "Phone Number",
      placeholder: "Enter your phone number",
      componentType: "input",
      type: "text",
    },
    {
      id: "additionalNumber",
      name: "additionalNumber",
      label: "Additional Number",
      placeholder: "Enter an additional number",
      componentType: "input",
      type: "text",
    },
    {
      id: "notesInformation",
      name: "notesInformation",
      label: "Notes Information",
      placeholder: "Enter any additional notes",
      componentType: "textarea",
    },
    {
      id: "region",
      name: "region",
      label: "Region",
      componentType: "select",
      options: [
        { id: "SelectRegion", value: "placeholder", label: "Select a region" },
        { id: "north", value: "north", label: "North" },
        { id: "south", value: "south", label: "South" },
        { id: "east", value: "east", label: "East" },
        { id: "west", value: "west", label: "West" },
      ],
    },
  ];
  
  export const addBlogFormElements = [
    // {
    //   id: "blog-image",
    //   name: "Image",
    //   label: "Blog Image URL",
    //   placeholder: "Enter the blog image URL",
    //   componentType: "input",
    //   type: "text",
    // },
    {
      id: "blog-title",
      name: "blogTitle",
      label: "Blog Title",
      placeholder: "Enter the blog title",
      componentType: "input",
      type: "text",
    },
    {
      id: "blog-content",
      name: "blogContent",
      label: "Blog Content",
      placeholder: "Write the blog content here",
      componentType: "textarea",
    },
    {
      id: "blog-content",
      name: "blogContent2",
      label: "Blog Content second Paragraph (Optional)",
      placeholder: "Write the blog content here",
      componentType: "textarea",
    },
    {
      id: "blog-content",
      name: "blogContent3",
      label: "Blog Content third Paragraph (Optional)",
      placeholder: "Write the blog content here",
      componentType: "textarea",
    },
    {
      id: "blog-author",
      name: "blogAuthor",
      label: "Blog Author",
      placeholder: "Enter the author's name",
      componentType: "input",
      type: "text",
    },
    // {
    //   id: "blog-date",
    //   name: "BlogDate",
    //   label: "Blog Date (Optional)",
    //   placeholder: "Enter the blog date",
    //   componentType: "input",
    //   type: "date",
    //   optional: true,
    // },
  ];
  