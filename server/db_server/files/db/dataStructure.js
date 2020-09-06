const config = {
    config:{
        fb_link: "fb_link TEXT",
        ig_link: "ig_link TEXT",

    },
    app_data: {
        table_name: "app_datas_table",
        id: {key: "id", schema: "id serial PRIMARY KEY NOT NULL"},
        property: {key: "property", schema: "property TEXT UNIQUE NOT NULL"},
        data: {key: "data", schema: "data JSONB"},
        comment: {key: "comment", schema: "comment Comment"},
        create_on: {key: "create_on", schema: "create_on TIMESTAMP default current_timestamp"},
        latest_modify: {key: "latest_modify", schema: "latest_modify TIMESTAMP default current_timestamp"},
        // primary_key: {schema: "PRIMARY KEY(id, property)"}
    },
    order: {
        table_name: "orders_table",
        id: {key: "id", schema: "id serial PRIMARY KEY NOT NULL"},
        order_id: {key: "order_id", schema: "order_id uuid DEFAULT uuid_generate_v4()"},
        buyer_name: {key: "buyer_name", schema:"buyer_name TEXT NOT NULL"},
        phone: {key: "phone", schema: "phone TEXT NOT NULL"},
        email: {key: "email", schema: "email TEXT NOT NULL"},
        bank_code: {key: "bank_code", schema: "bank_code TEXT NOT NULL"},
        bank_account: {key: "bank_account", schema: "bank_account TEXT NOT NULL"},
        country: {key: "country", schema: "country TEXT NOT NULL"},
        zip: {key: "zip", schema: "zip TEXT NOT NULL"},
        province: {key: "province", schema: "province TEXT NOT NULL"},
        county: {key: "county", schema: "county TEXT NOT NULL"},
        township: {key: "township", schema: "township TEXT NOT NULL"},
        village: {key: "village", schema: "village TEXT NOT NULL"},
        road: {key: "road", schema: "road TEXT NOT NULL"},
        items: {key: "items", schema: "items OrderItem ARRAY NOT NULL"},
        total_price: {key: "total_price", schema: "total_price NUMERIC NOT NULL"},
        unit: {key: "unit", schema: "unit TEXT NOT NULL", options: ["NTD"]},
        total_quantity: {key: "total_quantity", schema: "total_quantity INTEGER NOT NULL"},
        block_id: {key: "block_id", schema: "block_id TEXT"},
        block_link: {key: "block_link", schema: "block_link TEXT"},
        transaction_id: {key: "transaction_id", schema: "transaction_id TEXT"},
        agree_policy: {key: "agree_policy", schema: "agree_policy BOOLEAN NOT NULL"},
        agree_promotion: {key: "agree_promotion", schema: "agree_promotion BOOLEAN NOT NULL"},
        is_paid: {key: "is_paid", schema: "is_paid BOOLEAN NOT NULL"},
        is_send: {key: "is_send", schema: "is_send BOOLEAN NOT NULL"},
        is_recieved: {key: "is_recieved", schema: "is_recieved BOOLEAN NOT NULL"},
        comment: {key: "comment", schema: "comment Comment"},
        create_on: {key: "create_on", schema: "create_on TIMESTAMP default current_timestamp"},
        latest_modify: {key: "latest_modify", schema: "latest_modify TIMESTAMP default current_timestamp"}
    },
    post: {
        table_name: "posts_table",
        id: {key: "id", schema: "id serial PRIMARY KEY NOT NULL"},
        cover_img: {key: "cover_img", schema: "cover_img TEXT"},
        title: {key: "title", schema: "title TEXT NOT NULL"},
        subtitle: {key: "subtitle", schema: "subtitle TEXT NOT NULL"},
        author: {key: "author", schema:"author TEXT NOT NULL"},
        description: {key: "description", schema: "description TEXT NOT NULL"},
        comment: {key: "comment", schema: "comment Comment"},
        create_on: {key: "create_on", schema: "create_on TIMESTAMP default current_timestamp"},
        latest_modify: {key: "latest_modify", schema: "latest_modify TIMESTAMP default current_timestamp"}
    },
    farmer: {
        table_name: "farmers_table",
        id: {key: "id", schema: "id serial PRIMARY KEY NOT NULL"},
        name: {key: "name", schema: "name TEXT NOT NULL"},
        cover_img: {key: "cover_img", schema: "cover_img TEXT NOT NULL"},
        items: {key: "items", schema: "items Good ARRAY"}, // id, name Array
        comment: {key: "comment", schema: "comment Comment"},
        create_on: {key: "create_on", schema: "create_on TIMESTAMP default current_timestamp"},
        latest_modify: {key: "latest_modify", schema: "latest_modify TIMESTAMP default current_timestamp"}
    },
    item: {
        table_name: "items_table",
        type_name: "Item",
        id: {key: "id", schema: "id serial PRIMARY KEY NOT NULL"},
        enable: {key: "enable", schema: "enable BOOLEAN NOT NULL"},
        name: {key: "name", schema: "name TEXT NOT NULL"},
        producer_id: {key: "producer_id", schema: "producer_id INTEGER REFERENCES farmers_table(id) ON  DELETE CASCADE NOT NULL"},
        producer_name: {key: "producer_name", schema: "producer_name TEXT NOT NULL"}, // id Array
        country: {key: "country", schema: "country TEXT NOT NULL"},
        zip: {key: "zip", schema: "zip TEXT NOT NULL"},
        province: {key: "province", schema: "province TEXT NOT NULL"},
        county: {key: "county", schema: "county TEXT NOT NULL"},
        township: {key: "township", schema: "township TEXT NOT NULL"},
        village: {key: "village", schema: "village TEXT NOT NULL"},
        road: {key: "road", schema: "road TEXT NOT NULL"},
        sell_type: {key: "sell_type", schema: "sell_type SellType NOT NULL", options: ["pre_sale", "in_stock"]}, 
        price: {key: "price", schema: "price NUMERIC NOT NULL"},
        unit: {key: "unit", schema: "unit TEXT NOT NULL", options: ["NTD"]},
        amount: {key: "amount", schema: "amount INTEGER"},
        sold: {key: "sold", schema: "sold INTEGER NOT NULL"},
        slogan: {key: "slogan", schema: "slogan TEXT"},
        description: {key: "description", schema: "description TEXT NOT NULL"}, // Markdown Format
        content: {key: "content", schema: "content Section ARRAY NOT NULL"},
        certification: {key: "certification", schema: "certification Certification ARRAY"},
        spec: {key: "spec", schema: "spec Spec ARRAY"}, // 
        cover_img: {key: "cover_img", schema: "cover_img TEXT NOT NULL"},
        imgs: {key: "imgs", schema: "imgs TEXT ARRAY"}, // String Array
        block_id: {key: "block_id", schema: "block_id TEXT"},
        block_link: {key: "block_link", schema: "block_link TEXT"},
        transaction_id: {key: "transaction_id", schema: "transaction_id TEXT"},
        traceability_link :{key: "traceability_link", schema: "traceability_link TEXT"},
        comment: {key: "comment", schema: "comment Comment"},
        create_on: {key: "create_on", schema: "create_on TIMESTAMP default current_timestamp"},
        latest_modify: {key: "latest_modify", schema: "latest_modify TIMESTAMP default current_timestamp"},
        expire_on: {key: "expire_on", schema: "expire_on TIMESTAMP"},
        is_limited: {key: "is_limited", schema: "is_limited BOOLEAN NOT NULL"},
        has_expiration: {key: "has_expiration", schema: "has_expiration BOOLEAN NOT NULL"},
        constraint: {schema: "CONSTRAINT is_valid CHECK((amount >= sold AND sell_type = 'in_stock' AND is_limited = 'true') OR (create_on <= expire_on AND sell_type = 'pre_sale' AND has_expiration = 'true'))"}
    },
    Section: {
        type_name: "Section",
        display: {key: "display", schema: "display TEXT"},
        img: {key: "img", schema: "img TEXT"},
        backgroundColor: {key: "backgroundColor", schema: "backgroundColor TEXT"},
        title: {key: "title", schema: "title TEXT"},
        subtitle: {key: "subtitle", schema: "subtitle TEXT"},
        description: {key: "description", schema: "description TEXT"}, // Markdown Format
        data: {key: "data", schema: "data JSONB"},
        comment: {key: "comment", schema: "comment Comment"}
    },
    // Producer: {
    //     type_name: "Producer",
    //     id: {key: "id", schema: "id INTEGER"},
    //     name: {key: "name", schema: "name TEXT"}
    // },
    Spec: {
        type_name: "Spec",
        property: {key: "property", schema: "property TEXT"},
        value: {key: "value", schema: "value TEXT"},
        comment: {key: "comment", schema: "comment Comment"},
    },
    Good: {
        type_name: "Good",
        id: {key: "id", schema: "id INTEGER"},
        name: {key: "name", schema: "name TEXT"}
    },
    OrderItem: {
        type_name: "OrderItem",
        id: {key: "id", schema: "id INTEGER"},
        name: {key: "name", schema: "name TEXT"},
        quantity: {key: "quantity", schema: "quantity INTEGER"},
        price: {key: "price", schema: "price NUMERIC"},
        unit: {key: "unit", schema: "unit TEXT"},
    },
    Comment: {
        type_name: "Comment",
        note: {key: "note", schema: "note TEXT"},
        ext: {key: "ext", schema: "ext JSONB"}
    },
    Certification: {
        type_name: "Certification",
        name: {key: "name", schema: "name TEXT"},
        link: {key: "link", schema: "link TEXT"}
    },
    SellType: { // Enum Type
        type_name: "SellType",
        schema: "ENUM('pre_sale', 'in_stock')", 
        options: ["pre_sale", "in_stock"]
    },
    DisplayType: { // Enum Type
        type_name: "DisplayType",
        schema: "ENUM('banner', 'section')"
    },
    watch: {
        schema: `UPDATE items_table enable = 'false' WHERE (amount <= sold AND sell_type = 'in_stock' AND is_limited = 'true') OR (create_on <= expire_on AND sell_type = 'pre_sale' AND has_expiration = 'true') \watch 3`
    }
}

exports.dataStructure = config;