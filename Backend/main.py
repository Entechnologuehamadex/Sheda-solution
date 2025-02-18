from fastapi import FastAPI

app = FastAPI(title='Sheda Solutions Backend',version='0.1.0',docs_url='/',description='Backend for Sheda Solutions')

@app.get('/')
def read_root():
    return {"message": "Welcome to FastAPI CLI generated project!"}
