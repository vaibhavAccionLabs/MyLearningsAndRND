# Cloutenndance Folder Architecture

## Front-end Cloutendance

- **fe_coutendance**: The root folder of the frontend
    - **public**: Where the main app page reside
    - **src**: Source code resides here
        - **assets**: IMG/FONTS/ETC resides here
        - **redux**: The application state management resides here
        - **resources**: Contains all the codes of pages
            - **common**: folder for common reusable components
            - **styles**: all scss and css themings (code about all styles) reside here
            - **views**: all pages are structured and designed here
            - **app.js**: the main single page holder

## Back-end API Cloutendance

- **api_coutendance**: The root folder of the backend
    - **src**: Source code resides here
        - **config**: All the server configaration resides here
        - **controllers**: All backend logic resides here
        - **models**: All database object model resides here
        - **routes***: All api end points reside here
        - **index.js**: The root file of the app.