# Contributing to SupplierBuyer

First off, thank you for considering contributing to SupplierBuyer! It's people like you that make this platform better.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if applicable**
- **Include your environment details** (OS, browser, Node version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List any alternative solutions you've considered**

### Pull Requests

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (when available)
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Development Setup

See [SETUP.md](SETUP.md) for detailed setup instructions.

Quick start:
```bash
# Backend
cd backend
npm install
cp .env.example .env
# Edit .env with your settings
npm run dev

# Frontend (new terminal)
cd frontend
npm install
cp .env.example .env
npm start
```

## Coding Standards

### JavaScript/React

- Use ES6+ features
- Follow existing code style
- Use meaningful variable and function names
- Comment complex logic
- Keep functions small and focused

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters
- Reference issues and pull requests liberally

Examples:
```
Add product search functionality
Fix price update bug in supplier dashboard
Update README with new API endpoints
```

## Project Structure

```
supplierBuyer/
├── backend/          # Node.js/Express backend
│   ├── config/       # Database and app configuration
│   ├── controllers/  # Request handlers
│   ├── middleware/   # Express middleware
│   ├── models/       # Mongoose models
│   ├── routes/       # API routes
│   └── utils/        # Helper functions
│
├── frontend/         # React frontend
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   └── hooks/       # Custom React hooks
│   └── public/          # Static files
│
└── docs/             # Documentation
```

## What to Work On

### Good First Issues

Look for issues labeled `good-first-issue` - these are great for newcomers!

### Areas That Need Contribution

**Backend:**
- Add automated tests
- Improve error handling
- Add email notifications
- Implement order system
- Add product reviews/ratings
- Optimize database queries

**Frontend:**
- Add more interactive features
- Improve mobile responsiveness
- Add charts for price history
- Implement real-time updates (WebSockets)
- Add dark mode
- Improve accessibility

**Documentation:**
- Add more code examples
- Create video tutorials
- Translate documentation
- Add architecture diagrams

**DevOps:**
- CI/CD pipeline
- Docker configuration
- Kubernetes deployment
- Monitoring and logging

## Testing

Before submitting a PR:

1. Test your changes locally
2. Make sure existing functionality still works
3. Add tests for new features (when test infrastructure is available)
4. Update documentation if needed

See [TESTING.md](TESTING.md) for detailed testing guidelines.

## Style Guides

### Backend (Node.js)

```javascript
// Use async/await for asynchronous operations
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Use destructuring
const { name, email, role } = req.body;

// Use arrow functions for callbacks
array.map(item => item.name);
```

### Frontend (React)

```javascript
// Use functional components with hooks
const ProductCard = ({ product }) => {
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // Effect code
  }, [dependency]);
  
  return (
    <div className="product-card">
      {/* JSX */}
    </div>
  );
};

// Export at the bottom
export default ProductCard;
```

### CSS/Tailwind

- Use Tailwind utility classes
- Keep custom CSS minimal
- Use semantic class names for custom CSS
- Follow mobile-first approach

## API Design Guidelines

- Use RESTful conventions
- Use proper HTTP methods (GET, POST, PUT, DELETE)
- Use plural nouns for resources (`/products` not `/product`)
- Use proper status codes
- Include pagination for list endpoints
- Version your API if making breaking changes

## Database Schema Changes

When modifying the database schema:

1. Document the changes
2. Consider backward compatibility
3. Update seed script if needed
4. Update relevant controllers
5. Test thoroughly

## Documentation

- Update README.md for user-facing changes
- Update API.md for API changes
- Add JSDoc comments for complex functions
- Keep SETUP.md up to date

## Review Process

All submissions require review. We use GitHub pull requests for this purpose:

1. Maintainer reviews the code
2. Feedback is provided if changes are needed
3. Once approved, the PR is merged
4. Your contribution is now part of the project!

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project website (if/when created)

## Questions?

Feel free to:
- Open an issue with the `question` label
- Reach out to maintainers
- Join our community chat (if available)

## License

By contributing, you agree that your contributions will be licensed under the ISC License.

Thank you for contributing! 🎉
