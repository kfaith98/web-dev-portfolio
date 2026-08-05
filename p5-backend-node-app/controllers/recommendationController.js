import Event from '../models/Event.js';
import Arrangement from '../models/Arrangement.js';
import Supplier from '../models/Supplier.js';
import getSuggestions from '../utilities/getSuggestions.js';

export const getRecommendations = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findOne({
      _id: eventId,
      ownerId: req.user._id,
      isActive: true,
    });

    if (!event) {
      return res.status(404).json({
        message: 'Event not found',
      });
    }

    const arrangements = await Arrangement.find({ eventId }).populate(
      'supplierId',
    );

    const activeArrangements = arrangements.filter(
      (arrangement) => arrangement.supplierId,
    );

    const allCategories = Supplier.schema.path('category').enumValues;
    const coveredCategories = new Set(
      activeArrangements.map((arrangement) => arrangement.supplierId.category),
    );
    const gapCategories = allCategories.filter(
      (category) => !coveredCategories.has(category),
    );

    const arrangedSupplierIds = activeArrangements.map(
      (arrangement) => arrangement.supplierId._id,
    );
    const candidates = await Supplier.find({
      isActive: true,
      category: { $in: gapCategories },
      _id: { $nin: arrangedSupplierIds },
    });

    const suggestions = await getSuggestions(event, activeArrangements, candidates);
    const rankedSuggestions = suggestions.map((suggestion) => {
      const supplier = candidates.find(
        (c) => c._id.toString() === suggestion.supplierId,
      );
      return {
        _id: suggestion.supplierId,
        name: supplier.name,
        category: supplier.category,
        reasoning: suggestion.reasoning,
      };
    });

    res.status(200).json({
      success: true,
      data: {
        gapCategories,
        candidates,
        suggestions: rankedSuggestions,
      },
    });
  } catch (error) {
    next(error);
  }
};
