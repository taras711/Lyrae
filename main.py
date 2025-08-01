import os
import re

EXCLUDE_DIRS = {'node_modules', 'docs', '.git', 'dist', 'build', 'coverage', 'tests'}

def extract_info_from_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    doc_lines = []
    examples = []
    theory = []
    in_block_comment = False
    block_comment = []
    for i, line in enumerate(lines):
        stripped = line.strip()
        # Úvodní komentář jako teorie
        if i == 0 and (stripped.startswith('//') or stripped.startswith('/**')):
            theory.append(stripped)
        # Blokové komentáře
        if stripped.startswith('/**'):
            in_block_comment = True
            block_comment = [stripped]
            continue
        if in_block_comment:
            block_comment.append(stripped)
            if 'example' in stripped.lower() or 'příklad' in stripped.lower():
                examples.append(stripped)
            if stripped.endswith('*/'):
                doc_lines.extend(block_comment)
                in_block_comment = False
            continue
        # Jednořádkové komentáře
        if stripped.startswith('//'):
            doc_lines.append(stripped)
            if 'example' in stripped.lower() or 'příklad' in stripped.lower():
                examples.append(stripped)
        # Funkce a třídy
        if re.match(r'(function\s+\w+|class\s+\w+)', stripped):
            doc_lines.append(stripped)

    return {
        'theory': theory,
        'docs': doc_lines,
        'examples': examples
    }

def walk_project(src_dir):
    doc_data = {}
    for root, dirs, files in os.walk(src_dir):
        # Odstraníme složky, které mají být ignorovány
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        for file in files:
            if file.endswith('.js'):
                path = os.path.join(root, file)
                doc_data[path] = extract_info_from_file(path)
    return doc_data

def write_markdown(doc_data, output_path):
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write("# Dokumentace projektu\n\n")
        for filepath, content in doc_data.items():
            f.write(f"## Soubor: `{filepath}`\n\n")
            # Teorie
            if content['theory']:
                f.write("### Základní teorie\n")
                for line in content['theory']:
                    f.write(f"{line}\n")
                f.write("\n")
            # Dokumentace
            if content['docs']:
                f.write("### Důležité komentáře, funkce a třídy\n")
                for line in content['docs']:
                    f.write(f"- {line}\n")
                f.write("\n")
            # Praktické ukázky
            if content['examples']:
                f.write("### Praktické ukázky\n")
                for line in content['examples']:
                    f.write(f"> {line}\n")
                f.write("\n")

if __name__ == "__main__":
    src_dir = "./"
    output_path = "./docs/documentation.md"
    docs = walk_project(src_dir)
    write_markdown(docs, output_path)
    print(f"📄 Dokumentace vygenerována: {output_path}")
