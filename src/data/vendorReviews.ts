// Vendor reviews - different reviews for each vendor

export interface ReviewData {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
}

export const vendorReviews: Record<string, ReviewData[]> = {
  '1': [
    { id: 1, name: 'Sarah Johnson', rating: 5, date: '2 weeks ago', comment: 'Absolutely amazing service! The photographer captured every beautiful moment of our wedding. Highly recommend!' },
    { id: 2, name: 'Michael Chen', rating: 5, date: '1 month ago', comment: 'Professional and talented team. The photos turned out stunning and exceeded our expectations.' },
    { id: 3, name: 'Emily Rodriguez', rating: 4, date: '1 month ago', comment: 'Great experience overall. Very responsive and accommodating to our special requests.' },
    { id: 4, name: 'David Kumar', rating: 5, date: '2 months ago', comment: 'The best decision we made for our wedding! Beautiful work and great to work with.' },
    { id: 5, name: 'Jessica Williams', rating: 4, date: '2 months ago', comment: 'Wonderful photography and excellent customer service. Would definitely recommend to friends.' },
    { id: 6, name: 'James Anderson', rating: 5, date: '3 months ago', comment: 'Outstanding quality and professionalism. The photos are absolutely perfect!' },
    { id: 7, name: 'Maria Garcia', rating: 5, date: '3 months ago', comment: 'Incredible attention to detail. Every shot was perfect and the team was so friendly.' },
    { id: 8, name: 'Robert Taylor', rating: 4, date: '4 months ago', comment: 'Very satisfied with the service. The team was professional and delivered high-quality work.' },
    { id: 9, name: 'Linda Martinez', rating: 5, date: '4 months ago', comment: 'These photographers are true artists! They made our special day even more memorable.' },
    { id: 10, name: 'Christopher Lee', rating: 5, date: '5 months ago', comment: 'Exceptional service from start to finish. Couldn\'t be happier with the results!' }
  ],
  '2': [
    { id: 1, name: 'Amanda Foster', rating: 5, date: '1 week ago', comment: 'Daddy Band made our wedding unforgettable! The energy they brought was incredible and all our guests were dancing all night!' },
    { id: 2, name: 'Ryan Mitchell', rating: 5, date: '2 weeks ago', comment: 'Best band we could have chosen! They played exactly what we wanted and read the crowd perfectly.' },
    { id: 3, name: 'Priya Patel', rating: 5, date: '3 weeks ago', comment: 'Professional, talented, and so much fun! They made our reception the party of the year.' },
    { id: 4, name: 'Mark Thompson', rating: 4, date: '1 month ago', comment: 'Great musicians with an excellent repertoire. Very accommodating with song requests.' },
    { id: 5, name: 'Lisa Wong', rating: 5, date: '1 month ago', comment: 'The band was the highlight of our event! Everyone is still talking about them weeks later.' },
    { id: 6, name: 'Daniel Brown', rating: 5, date: '2 months ago', comment: 'Incredible performance! They kept the dance floor packed all night. Highly recommend!' },
    { id: 7, name: 'Sofia Ramirez', rating: 5, date: '2 months ago', comment: 'Amazing energy and talent. They made our wedding reception absolutely perfect!' },
    { id: 8, name: 'Kevin O\'Brien', rating: 4, date: '3 months ago', comment: 'Very professional band. Great sound quality and they really knew how to entertain a crowd.' },
    { id: 9, name: 'Rachel Green', rating: 5, date: '3 months ago', comment: 'Worth every penny! The band was fantastic and really made our special day memorable.' },
    { id: 10, name: 'Thomas Anderson', rating: 5, date: '4 months ago', comment: 'Best decision we made for our wedding entertainment. The band exceeded all expectations!' }
  ],
  '3': [
    { id: 1, name: 'Catherine Miller', rating: 5, date: '1 week ago', comment: 'Kulunu Weddings transformed our venue into a fairy tale! The decoration was beyond our dreams.' },
    { id: 2, name: 'Jonathan Lee', rating: 5, date: '2 weeks ago', comment: 'Absolutely stunning work! Every detail was perfect and the team was so professional.' },
    { id: 3, name: 'Melissa Santos', rating: 4, date: '3 weeks ago', comment: 'Beautiful floral arrangements and excellent planning service. Made our day stress-free!' },
    { id: 4, name: 'Andrew Wilson', rating: 5, date: '1 month ago', comment: 'The decoration exceeded all expectations. Kulunu Weddings is truly the best in the business!' },
    { id: 5, name: 'Natalie Cooper', rating: 5, date: '1 month ago', comment: 'From planning to execution, everything was flawless. Highly recommend their services!' },
    { id: 6, name: 'Benjamin Hayes', rating: 5, date: '2 months ago', comment: 'The attention to detail was remarkable. Our venue looked absolutely magical!' },
    { id: 7, name: 'Victoria Chang', rating: 4, date: '2 months ago', comment: 'Excellent service and beautiful decoration. The team was very responsive to our ideas.' },
    { id: 8, name: 'Samuel Rodriguez', rating: 5, date: '3 months ago', comment: 'They brought our vision to life perfectly! The floral arrangements were breathtaking.' },
    { id: 9, name: 'Olivia Martinez', rating: 5, date: '3 months ago', comment: 'Best wedding planners and decorators! They made the entire process so easy and enjoyable.' },
    { id: 10, name: 'William Turner', rating: 5, date: '4 months ago', comment: 'Kulunu Weddings is worth every penny. The decoration was stunning and exceeded our expectations!' }
  ]
};

export const getVendorReviews = (vendorId: string): ReviewData[] => {
  return vendorReviews[vendorId] || [];
};
