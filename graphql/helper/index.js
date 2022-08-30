export const successResponse = (req, res, data, code = 200) => res.json({
  code,
  data,
  success: true,
});

export const errorResponse = (req, res, errorMessage = 'Something went wrong', code = 500) => res.status(500).json({
  code,
  data: { error: errorMessage },
  success: false,
});
