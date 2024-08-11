import json
import http.client
import os

def lambda_handler(event, context):
    # Supabase URL과 API 키 설정
    SUPABASE_URL = 'sample.supabase.co'
    SUPABASE_KEY = os.environ['SUPABASE_API_KEY']
    table_name = 'testing_web_push'
   
    # 데이터 설정
    data = {
        'user_id': 'email@email.com',
    }
   
    # JSON으로 변환
    data_json = json.dumps(data)
   
    # HTTP 연결 및 요청 설정
    conn = http.client.HTTPSConnection(SUPABASE_URL)
   
    headers = {
        'apikey': SUPABASE_KEY,
        'Authorization': f'Bearer {SUPABASE_KEY}',
        'Content-Type': 'application/json'
    }
   
    try:
        # POST 요청을 보내서 데이터를 Supabase에 삽입
        conn.request('POST', f'/rest/v1/{table_name}', body=data_json, headers=headers)
       
        response = conn.getresponse()
        response_data = response.read().decode()
       
        if response.status == 201:
            return {
                'statusCode': 200,
                'body': json.dumps('Data inserted successfully')
            }
        else:
            return {
                'statusCode': response.status,
                'body': json.dumps(f'Error inserting data: {response_data}')
            }
   
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error: {str(e)}')
        }
    finally:
        conn.close()
