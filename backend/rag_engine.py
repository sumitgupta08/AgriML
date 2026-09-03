import os
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

KNOWLEDGE_FILE = os.path.join(os.path.dirname(__file__), "knowledge", "agronomy_guide.txt")

chunks = []
vectorizer = None
tfidf_matrix = None

def load_and_index():
    global chunks, vectorizer, tfidf_matrix
    if not os.path.exists(KNOWLEDGE_FILE):
        return

    with open(KNOWLEDGE_FILE, "r", encoding="utf-8") as f:
        content = f.read()

    # Split documents by sectional brackets [SECTION NAME]
    raw_sections = re.split(r'\n(?=\[[A-Z0-9\s&]+\])', content.strip())
    chunks = [s.strip() for s in raw_sections if len(s.strip()) > 20]

    if chunks:
        vectorizer = TfidfVectorizer(stop_words="english")
        tfidf_matrix = vectorizer.fit_transform(chunks)
        print(f"[RAG Engine] Indexed {len(chunks)} agricultural knowledge chunks.")

load_and_index()

def retrieve_knowledge(query: str, k: int = 2):
    if not chunks or vectorizer is None or tfidf_matrix is None:
        return ["No knowledge documents indexed."]

    query_vec = vectorizer.transform([query])
    scores = cosine_similarity(query_vec, tfidf_matrix).flatten()
    top_indices = scores.argsort()[::-1][:k]

    results = []
    for idx in top_indices:
        if scores[idx] > 0.05:  # Similarity threshold
            results.append(chunks[idx])

    return results if results else ["No closely matching advisory guidelines found for this query."]