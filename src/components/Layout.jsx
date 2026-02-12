function Layout ({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">{children}</div>
    </div>
  )
}
export default Layout;