const { poolPromise, sql } = require("../db");

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM PRODUCTS");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .query("SELECT * FROM PRODUCTS WHERE PRODUCTID = @id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new product
exports.createProduct = async (req, res) => {
  const { PRODUCTNAME, PRICE, STOCK } = req.body;

  if (!PRODUCTNAME || PRICE == null || STOCK == null) {
    return res.status(400).json({ error: "Please provide all fields" });
  }

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("PRODUCTNAME", sql.NVarChar, PRODUCTNAME)
      .input("PRICE", sql.Decimal(10, 2), PRICE)
      .input("STOCK", sql.Int, STOCK)
      .query(
        `INSERT INTO PRODUCTS (PRODUCTNAME, PRICE, STOCK)
         OUTPUT INSERTED.PRODUCTID
         VALUES (@PRODUCTNAME, @PRICE, @STOCK)`
      );

    res.status(201).json({ productId: result.recordset[0].PRODUCTID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update product by ID
exports.updateProduct = async (req, res) => {
  const { PRODUCTNAME, PRICE, STOCK } = req.body;
  const { id } = req.params;

  if (!PRODUCTNAME || PRICE == null || STOCK == null) {
    return res.status(400).json({ error: "Please provide all fields" });
  }

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("PRODUCTID", sql.Int, id)
      .input("PRODUCTNAME", sql.NVarChar, PRODUCTNAME)
      .input("PRICE", sql.Decimal(10, 2), PRICE)
      .input("STOCK", sql.Int, STOCK)
      .query(
        `UPDATE PRODUCTS
         SET PRODUCTNAME = @PRODUCTNAME, PRICE = @PRICE, STOCK = @STOCK
         WHERE PRODUCTID = @PRODUCTID`
      );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete product by ID
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("PRODUCTID", sql.Int, id)
      .query("DELETE FROM PRODUCTS WHERE PRODUCTID = @PRODUCTID");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
