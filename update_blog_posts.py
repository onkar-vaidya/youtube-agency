import os
import re

def update_blog_posts(directory):
    # Get all HTML files in the blog directory
    for filename in os.listdir(directory):
        if filename.endswith('.html') and filename != 'index.html':
            filepath = os.path.join(directory, filename)
            
            try:
                with open(filepath, 'r', encoding='utf-8') as file:
                    content = file.read()
                
                # Replace Social Brains with SooperBlooper
                content = content.replace('Social Brains', 'SooperBlooper')
                
                # Update logo alt text
                content = content.replace('alt="YouTube Agency Logo"', 'alt="SooperBlooper Logo"')
                
                # Update copyright text
                content = re.sub(
                    r'&copy; 2025 YouTube Agency\. All rights reserved\.',
                    '© 2025 SooperBlooper. All rights reserved.',
                    content
                )
                
                # Update meta descriptions
                content = content.replace(
                    'Social Brains YouTube Agency',
                    'SooperBlooper YouTube Agency'
                )
                
                # Write the updated content back to the file
                with open(filepath, 'w', encoding='utf-8') as file:
                    file.write(content)
                
                print(f"Updated: {filename}")
                
            except Exception as e:
                print(f"Error processing {filename}: {str(e)}")

if __name__ == "__main__":
    blog_dir = os.path.join(os.path.dirname(__file__), 'blog')
    update_blog_posts(blog_dir)
    print("Blog post updates complete!")
