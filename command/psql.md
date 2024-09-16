# Update
## Shell script
* required port forwarding on local
```
#!/bin/bash

export PGPASSWORD='{PASSWORD}'

files=(
    "sample.csv"
)

directory="/sample"

for file in "${files[@]}"; do
    echo "Start processing file: $file"
    full_path="$directory/$file"

    psql -U {DB_USER} -d {DB_NAME} -p 3547 -h localhost <<EOF
    -- Step 1: Create Temporary Table
    CREATE TEMP TABLE temp_sample_data (
        id varchar(255),
        url varchar(255)
    );

    -- Step 2: Copy CSV Data into Temporary Table
    \copy temp_sample_data (id,url) FROM '$full_path' WITH DELIMITER ',' CSV HEADER;

    -- Step 3: Update Only Existing Records in public.sample
    UPDATE public.sample
    SET url = temp.url,
        updated_at = '2024-09-14 14:00:00 +0900'
    FROM temp_sample_data temp
    WHERE sample.id = temp.id;

    -- Drop the temporary table after the update
    DROP TABLE temp_sample_data;
EOF

    echo "Finished processing file: $file"
done
```

# Insert
## Shell script
* required port forwarding on local
```
#!/bin/bash

export PGPASSWORD='{PASSWORD}'

files=(
    "sample.csv"
)

directory="/sample"

for file in "${files[@]}"; do
    echo "Start copy company file: $file"
    full_path="$directory/$file"
    psql -U {DB_USER} -d {DB_NAME} -p 3589 -h localhost -c "\copy sample (id,url) FROM '$full_path' WITH DELIMITER ',' CSV HEADER;"
done
```
