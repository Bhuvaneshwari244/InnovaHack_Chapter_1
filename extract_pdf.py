import sys

try:
    import pdfplumber
except ImportError:
    print("Installing pdfplumber...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pdfplumber"])
    import pdfplumber

def extract_text_from_pdf(pdf_path):
    """Extract text from PDF file"""
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page_num, page in enumerate(pdf.pages, 1):
            print(f"Extracting page {page_num}...")
            page_text = page.extract_text()
            if page_text:
                text += f"\n{'='*60}\nPAGE {page_num}\n{'='*60}\n"
                text += page_text + "\n"
    return text

if __name__ == "__main__":
    pdf_path = "InnovaHack Chapter 1 - Problem Statement.pdf"
    
    print(f"Extracting text from: {pdf_path}\n")
    extracted_text = extract_text_from_pdf(pdf_path)
    
    # Save to text file
    output_file = "problem_statements.txt"
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(extracted_text)
    
    print(f"\n✓ Text extracted successfully!")
    print(f"✓ Saved to: {output_file}")
    print(f"\nTotal characters extracted: {len(extracted_text)}")
